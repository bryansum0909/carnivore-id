import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gddynfmhdscpfmsynamo.supabase.co'
const SUPABASE_KEY = 'sb_publishable_x0LVGcQC50k9xvMQPqFBoQ_L7pXOy2e'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
