import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [foodLog, setFoodLog] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        fetchProfile(session.user.id)
        fetchFoodLog(session.user.id)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        fetchProfile(session.user.id)
        fetchFoodLog(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
        setFoodLog([])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (data) setProfile(data)
  }

  const fetchFoodLog = async (userId) => {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase
      .from('food_log')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .order('created_at', { ascending: true })
    if (data) setFoodLog(data)
  }

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { ok: false, error: 'Email atau password salah' }
    return { ok: true }
  }

  const register = async (name, email, password, weight, targetWeight, height, age) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { ok: false, error: error.message }

    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      name,
      email,
      initials,
      level: 'Pemula',
      weight: parseFloat(weight),
      target_weight: parseFloat(targetWeight),
      height: parseInt(height) || 170,
      age: parseInt(age) || 25,
      daily_cal: Math.round(parseFloat(weight) * 28),
      daily_protein: Math.round(parseFloat(weight) * 2.2),
      daily_fat: Math.round(parseFloat(weight) * 1.5),
      streak: 0,
      weight_history: [parseFloat(weight)],
      saved_recipes: [],
    })

    if (profileError) return { ok: false, error: profileError.message }
    return { ok: true }
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  const addFoodEntry = async (entry) => {
    if (!user) return
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase.from('food_log').insert({
      user_id: user.id,
      date: today,
      name: entry.name,
      amount: entry.amount,
      unit: entry.unit,
      meal_type: entry.mealType,
      cal: entry.cal,
      protein: entry.protein,
      fat: entry.fat,
      carb: entry.carb || 0,
    }).select().single()

    if (!error && data) {
      setFoodLog(prev => [...prev, data])
    }
  }

  const removeFoodEntry = async (id) => {
    await supabase.from('food_log').delete().eq('id', id)
    setFoodLog(prev => prev.filter(e => e.id !== id))
  }

  const todayLog = foodLog.map(e => ({ ...e, mealType: e.meal_type || e.mealType }))

  const todayTotals = todayLog.reduce((acc, e) => ({
    cal: acc.cal + (e.cal || 0),
    protein: acc.protein + (e.protein || 0),
    fat: acc.fat + (e.fat || 0),
  }), { cal: 0, protein: 0, fat: 0 })

  const fullUser = profile ? {
    ...profile,
    email: user?.email,
    dailyCal: profile.daily_cal,
    dailyProtein: profile.daily_protein,
    dailyFat: profile.daily_fat,
    targetWeight: profile.target_weight,
    weightHistory: profile.weight_history || [profile.weight],
    savedRecipes: profile.saved_recipes || [],
  } : null

  return (
    <AuthContext.Provider value={{
      user: fullUser,
      rawUser: user,
      login, logout, register,
      foodLog, todayLog, todayTotals,
      addFoodEntry, removeFoodEntry,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
