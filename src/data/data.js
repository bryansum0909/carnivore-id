export const FOODS_DB = [
  // Daging Sapi
  { id: 1, name: 'Daging sapi ribeye', unit: 'g', per100: { cal: 238, protein: 25, fat: 15, carb: 0 } },
  { id: 2, name: 'Daging sapi sirloin', unit: 'g', per100: { cal: 207, protein: 26, fat: 11, carb: 0 } },
  { id: 3, name: 'Daging sapi T-bone', unit: 'g', per100: { cal: 219, protein: 24, fat: 13, carb: 0 } },
  { id: 4, name: 'Daging sapi giling (80/20)', unit: 'g', per100: { cal: 254, protein: 17, fat: 20, carb: 0 } },
  { id: 5, name: 'Daging sapi has dalam', unit: 'g', per100: { cal: 195, protein: 27, fat: 9, carb: 0 } },
  { id: 6, name: 'Daging sapi iga (short rib)', unit: 'g', per100: { cal: 290, protein: 22, fat: 22, carb: 0 } },
  { id: 7, name: 'Daging sapi sengkel', unit: 'g', per100: { cal: 180, protein: 26, fat: 8, carb: 0 } },
  // Jeroan Sapi
  { id: 8, name: 'Hati sapi', unit: 'g', per100: { cal: 135, protein: 20, fat: 4, carb: 4 } },
  { id: 9, name: 'Ginjal sapi', unit: 'g', per100: { cal: 99, protein: 17, fat: 3, carb: 1 } },
  { id: 10, name: 'Jantung sapi', unit: 'g', per100: { cal: 112, protein: 17, fat: 4, carb: 0 } },
  { id: 11, name: 'Lidah sapi', unit: 'g', per100: { cal: 224, protein: 19, fat: 16, carb: 0 } },
  { id: 12, name: 'Sumsum tulang sapi', unit: 'g', per100: { cal: 778, protein: 7, fat: 84, carb: 0 } },
  // Daging Babi
  { id: 13, name: 'Perut babi (pork belly)', unit: 'g', per100: { cal: 395, protein: 10, fat: 40, carb: 0 } },
  { id: 14, name: 'Bacon (daging asap)', unit: 'g', per100: { cal: 417, protein: 12, fat: 37, carb: 0 } },
  { id: 15, name: 'Daging babi iga', unit: 'g', per100: { cal: 282, protein: 20, fat: 22, carb: 0 } },
  { id: 16, name: 'Daging babi cincang', unit: 'g', per100: { cal: 263, protein: 18, fat: 21, carb: 0 } },
  // Daging Kambing & Domba
  { id: 17, name: 'Iga kambing', unit: 'g', per100: { cal: 294, protein: 25, fat: 21, carb: 0 } },
  { id: 18, name: 'Daging kambing giling', unit: 'g', per100: { cal: 258, protein: 24, fat: 17, carb: 0 } },
  { id: 19, name: 'Hati kambing', unit: 'g', per100: { cal: 116, protein: 20, fat: 3, carb: 2 } },
  // Ayam & Unggas
  { id: 20, name: 'Dada ayam (tanpa kulit)', unit: 'g', per100: { cal: 165, protein: 31, fat: 4, carb: 0 } },
  { id: 21, name: 'Paha ayam (dengan kulit)', unit: 'g', per100: { cal: 229, protein: 16, fat: 18, carb: 0 } },
  { id: 22, name: 'Sayap ayam', unit: 'g', per100: { cal: 203, protein: 19, fat: 13, carb: 0 } },
  { id: 23, name: 'Dada ayam kampung', unit: 'g', per100: { cal: 148, protein: 29, fat: 3, carb: 0 } },
  { id: 24, name: 'Paha ayam kampung', unit: 'g', per100: { cal: 200, protein: 18, fat: 14, carb: 0 } },
  { id: 25, name: 'Hati ayam', unit: 'g', per100: { cal: 119, protein: 17, fat: 5, carb: 1 } },
  { id: 26, name: 'Ampela ayam', unit: 'g', per100: { cal: 94, protein: 18, fat: 2, carb: 0 } },
  { id: 27, name: 'Daging bebek', unit: 'g', per100: { cal: 337, protein: 19, fat: 28, carb: 0 } },
  // Seafood
  { id: 28, name: 'Salmon fillet', unit: 'g', per100: { cal: 208, protein: 20, fat: 13, carb: 0 } },
  { id: 29, name: 'Tuna segar', unit: 'g', per100: { cal: 130, protein: 28, fat: 1, carb: 0 } },
  { id: 30, name: 'Ikan cakalang', unit: 'g', per100: { cal: 103, protein: 22, fat: 1, carb: 0 } },
  { id: 31, name: 'Ikan kerapu', unit: 'g', per100: { cal: 118, protein: 25, fat: 1, carb: 0 } },
  { id: 32, name: 'Ikan kakap merah', unit: 'g', per100: { cal: 100, protein: 21, fat: 1, carb: 0 } },
  { id: 33, name: 'Ikan tongkol', unit: 'g', per100: { cal: 132, protein: 26, fat: 3, carb: 0 } },
  { id: 34, name: 'Ikan bandeng', unit: 'g', per100: { cal: 148, protein: 20, fat: 7, carb: 0 } },
  { id: 35, name: 'Ikan lele', unit: 'g', per100: { cal: 116, protein: 18, fat: 4, carb: 0 } },
  { id: 36, name: 'Ikan gurame', unit: 'g', per100: { cal: 96, protein: 19, fat: 2, carb: 0 } },
  { id: 37, name: 'Udang segar', unit: 'g', per100: { cal: 99, protein: 24, fat: 0, carb: 0 } },
  { id: 38, name: 'Udang vaname', unit: 'g', per100: { cal: 85, protein: 20, fat: 1, carb: 0 } },
  { id: 39, name: 'Cumi-cumi', unit: 'g', per100: { cal: 92, protein: 16, fat: 1, carb: 3 } },
  { id: 40, name: 'Kepiting', unit: 'g', per100: { cal: 97, protein: 19, fat: 2, carb: 0 } },
  { id: 41, name: 'Kerang', unit: 'g', per100: { cal: 86, protein: 15, fat: 2, carb: 4 } },
  { id: 42, name: 'Lobster', unit: 'g', per100: { cal: 89, protein: 19, fat: 1, carb: 0 } },
  // Telur
  { id: 43, name: 'Telur ayam', unit: 'butir', per100: { cal: 72, protein: 6, fat: 5, carb: 0 } },
  { id: 44, name: 'Telur ayam kampung', unit: 'butir', per100: { cal: 65, protein: 6, fat: 4, carb: 0 } },
  { id: 45, name: 'Telur bebek', unit: 'butir', per100: { cal: 130, protein: 9, fat: 10, carb: 1 } },
  { id: 46, name: 'Telur puyuh', unit: 'butir', per100: { cal: 14, protein: 1, fat: 1, carb: 0 } },
  // Produk Susu & Lemak
  { id: 47, name: 'Mentega tawar', unit: 'g', per100: { cal: 717, protein: 1, fat: 81, carb: 0 } },
  { id: 48, name: 'Keju cheddar', unit: 'g', per100: { cal: 402, protein: 25, fat: 33, carb: 1 } },
  { id: 49, name: 'Keju mozzarella', unit: 'g', per100: { cal: 280, protein: 28, fat: 17, carb: 2 } },
  { id: 50, name: 'Krim kental (heavy cream)', unit: 'ml', per100: { cal: 340, protein: 2, fat: 36, carb: 3 } },
  { id: 51, name: 'Lemak babi (lard)', unit: 'g', per100: { cal: 902, protein: 0, fat: 100, carb: 0 } },
  { id: 52, name: 'Lemak sapi (tallow)', unit: 'g', per100: { cal: 902, protein: 0, fat: 100, carb: 0 } },
  // Kaldu & Minuman
  { id: 53, name: 'Kaldu tulang sapi', unit: 'ml', per100: { cal: 10, protein: 2, fat: 0, carb: 0 } },
  { id: 54, name: 'Kaldu ayam', unit: 'ml', per100: { cal: 8, protein: 1, fat: 0, carb: 0 } },
];

export const RECIPES = [
  {
    id: 1, name: 'Ribeye Steak Butter Basted', cat: 'sapi', emoji: '🥩',
    time: '25 menit', cal: 714, protein: 75, fat: 42,
    tags: ['Sapi', 'Tinggi protein', 'Mudah'],
    desc: 'Ribeye juicy dengan teknik butter basting — sempurna untuk carnivore.',
    ingredients: ['300g ribeye steak', '30g mentega', 'Garam laut secukupnya', 'Rosemary (opsional)'],
    steps: [
      'Keluarkan steak dari kulkas 30 menit sebelum dimasak, taburi garam kedua sisi.',
      'Panaskan pan cast iron hingga sangat panas, masukkan steak.',
      'Masak 2-3 menit tiap sisi (medium rare). Tambahkan mentega dan siram terus ke atas steak.',
      'Istirahatkan steak 5 menit sebelum dipotong.'
    ]
  },
  {
    id: 2, name: 'Salmon Panggang Mentega', cat: 'seafood', emoji: '🐟',
    time: '20 menit', cal: 498, protein: 55, fat: 30,
    tags: ['Seafood', 'Omega-3', 'Sehat'],
    desc: 'Salmon panggang dengan mentega — kaya omega-3 dan lemak baik.',
    ingredients: ['250g salmon fillet', '25g mentega', 'Garam & merica', 'Lemon (opsional)'],
    steps: [
      'Keringkan salmon dengan tisu dapur, taburi garam kedua sisi.',
      'Lelehkan mentega di pan sedang-tinggi.',
      'Masak salmon kulit di bawah 4-5 menit, balik dan masak 2-3 menit lagi.',
      'Siram mentega cair ke atas salmon saat memasak.'
    ]
  },
  {
    id: 3, name: 'Bone Broth Sapi', cat: 'sapi', emoji: '🦴',
    time: '8–12 jam', cal: 80, protein: 8, fat: 3,
    tags: ['Sapi', 'Kolagen', 'Nutrisi padat'],
    desc: 'Kaldu tulang sapi kaya kolagen — minuman wajib carnivore diet.',
    ingredients: ['1 kg tulang sapi (knuckle/marrow)', '2L air', 'Garam', '2 sdm cuka apel (opsional)'],
    steps: [
      'Rebus tulang 10 menit, buang air, cuci bersih.',
      'Masukkan tulang ke slow cooker, isi air, tambah cuka apel.',
      'Masak 8-12 jam (slow cooker) atau 4 jam (pressure cooker).',
      'Saring, simpan di kulkas. Lapisan lemak di atas bisa ikut dimakan.'
    ]
  },
  {
    id: 4, name: 'Ayam Panggang Kulit Crispy', cat: 'ayam', emoji: '🍗',
    time: '50 menit', cal: 520, protein: 48, fat: 35,
    tags: ['Ayam', 'Tinggi lemak', 'Crispy'],
    desc: 'Ayam panggang dengan kulit super crispy — kunci ada di teknik pengeringan.',
    ingredients: ['2 paha ayam (skin on)', 'Garam laut', 'Mentega 20g'],
    steps: [
      'Keringkan ayam di kulkas tanpa tutup semalaman (atau 2 jam dengan tisu).',
      'Taburi garam banyak di atas kulit.',
      'Panggang 220°C selama 35-40 menit kulit ke atas.',
      'Siram mentega leleh di atas 5 menit sebelum selesai.'
    ]
  },
  {
    id: 5, name: 'Beef Liver & Bacon', cat: 'sapi', emoji: '🫀',
    time: '15 menit', cal: 380, protein: 35, fat: 22,
    tags: ['Organ meat', 'Nutrisi padat', 'Cepat'],
    desc: 'Hati sapi + bacon — kombinasi nutrisi terdapat di carnivore diet.',
    ingredients: ['150g beef liver', '80g bacon', 'Mentega 15g', 'Garam'],
    steps: [
      'Rendam liver dalam air + sedikit garam selama 30 menit, tiriskan.',
      'Iris liver tipis-tipis, keringkan.',
      'Masak bacon hingga crispy, sisihkan.',
      'Di pan yang sama, masak liver 2 menit tiap sisi. Tambah mentega. Sajikan dengan bacon.'
    ]
  },
  {
    id: 6, name: 'Scrambled Eggs & Bacon', cat: 'telur', emoji: '🥚',
    time: '10 menit', cal: 420, protein: 28, fat: 33,
    tags: ['Telur', 'Sarapan', 'Cepat'],
    desc: 'Sarapan carnivore klasik — telur scramble creamy dengan bacon.',
    ingredients: ['3 telur ayam', '80g bacon', '20g mentega', 'Garam'],
    steps: [
      'Masak bacon hingga crispy, sisihkan.',
      'Kecilkan api, lelehkan mentega.',
      'Kocok telur + garam, tuang ke pan. Aduk perlahan dengan spatula.',
      'Angkat sebelum terlalu matang — masih sedikit basah saat di pan akan sempurna di piring.'
    ]
  },
  {
    id: 7, name: 'Udang Bakar Mentega', cat: 'seafood', emoji: '🦐',
    time: '12 menit', cal: 290, protein: 32, fat: 15,
    tags: ['Seafood', 'Cepat', 'Rendah kalori'],
    desc: 'Udang bakar sederhana dengan mentega — cocok untuk makan siang cepat.',
    ingredients: ['200g udang bersih', '25g mentega', 'Garam & merica', 'Bawang putih (opsional)'],
    steps: [
      'Bersihkan udang, keringkan dengan tisu.',
      'Panaskan pan, lelehkan mentega.',
      'Masak udang 2-3 menit tiap sisi hingga merah muda.',
      'Taburi garam dan sajikan panas.'
    ]
  },
  {
    id: 8, name: 'Ground Beef Patty', cat: 'sapi', emoji: '🍔',
    time: '15 menit', cal: 560, protein: 42, fat: 44,
    tags: ['Sapi', 'Mudah', 'Mengenyangkan'],
    desc: 'Beef patty tebal tanpa roti — carnivore burger klasik.',
    ingredients: ['200g ground beef 80/20', 'Garam laut', 'Mentega 15g'],
    steps: [
      'Bentuk ground beef menjadi patty tebal 2cm, jangan terlalu dipadatkan.',
      'Taburi garam kasar kedua sisi.',
      'Masak di pan panas 3-4 menit tiap sisi.',
      'Tambahkan mentega di akhir, biarkan meleleh di atas patty.'
    ]
  },
];

export const STORES = [
  { id: 1, name: 'Tokopedia / Shopee', type: 'online', emoji: '🛒', desc: 'Daging segar, frozen meat, beef jerky, susu raw, telur kampung', url: 'https://tokopedia.com', tags: ['Daging', 'Telur', 'Frozen'] },
  { id: 2, name: 'Meatshop.id', type: 'online', emoji: '🥩', desc: 'Wagyu, grass-fed beef, organ meat, bone broth siap minum', url: 'https://meatshop.id', tags: ['Premium', 'Grass-fed', 'Organ meat'] },
  { id: 3, name: 'RAW Meats Indonesia', type: 'online', emoji: '🦴', desc: 'Daging sapi & babi premium, pork belly, lamb — pengiriman frozen', url: '#', tags: ['Premium', 'Pork', 'Lamb'] },
  { id: 4, name: 'eFishery / FreshFish.id', type: 'online', emoji: '🐟', desc: 'Salmon, tuna, udang, cumi segar langsung dari nelayan & tambak', url: '#', tags: ['Seafood', 'Segar', 'Terpercaya'] },
  { id: 5, name: 'Klikdokter Health Store', type: 'online', emoji: '💊', desc: 'Suplemen carnivore: elektrolit, vitamin D3+K2, omega-3 capsule', url: '#', tags: ['Suplemen', 'Elektrolit'] },
  { id: 6, name: 'Ranch Market', type: 'offline', emoji: '🏪', desc: 'Imported beef, grass-fed, deli meat, keju berkualitas, butter premium', url: '#', tags: ['Supermarket', 'Imported', 'Premium'] },
  { id: 7, name: 'Grand Lucky Superstore', type: 'offline', emoji: '🏬', desc: 'Daging segar lokal dan impor, seafood counter, produk susu', url: '#', tags: ['Supermarket', 'Lengkap'] },
  { id: 8, name: 'Pasar Tradisional', type: 'offline', emoji: '🏘️', desc: 'Daging lokal segar paling murah, organ meat (jeroan), telur kampung, ikan lokal', url: '#', tags: ['Murah', 'Segar', 'Jeroan'] },
  { id: 9, name: 'TPI / Tempat Pelelangan Ikan', type: 'offline', emoji: '🚢', desc: 'Ikan segar harga nelayan langsung — tuna, cakalang, kerapu, udang laut', url: '#', tags: ['Seafood', 'Murah', 'Langsung nelayan'] },
  { id: 10, name: 'Peternak Lokal (WhatsApp)', type: 'offline', emoji: '🐄', desc: 'Daging sapi grass-fed, sapi bali, telur kampung langsung peternak via WA', url: '#', tags: ['Grass-fed', 'Lokal', 'Langsung peternak'] },
];

export const MEAL_PLAN_TEMPLATES = {
  0: { // Senin
    breakfast: { name: 'Ribeye Steak + 2 Telur Ceplok', cal: 780, protein: 70, fat: 55, time: '07:00' },
    lunch: { name: 'Salmon Panggang + Bone Broth', cal: 560, protein: 58, fat: 32, time: '12:30' },
    dinner: { name: 'T-Bone Steak medium rare', cal: 820, protein: 78, fat: 58, time: '19:00' },
  },
  1: {
    breakfast: { name: 'Scrambled Eggs & Bacon (3+4)', cal: 510, protein: 35, fat: 40, time: '07:30' },
    lunch: { name: 'Chicken Thigh Panggang x2', cal: 620, protein: 52, fat: 45, time: '13:00' },
    dinner: { name: 'Ground Beef Patty 250g', cal: 700, protein: 52, fat: 55, time: '19:00' },
  },
  2: {
    breakfast: { name: 'Beef Liver & Bacon', cal: 460, protein: 42, fat: 28, time: '07:00' },
    lunch: { name: 'Udang Bakar Mentega 300g', cal: 430, protein: 48, fat: 22, time: '12:00' },
    dinner: { name: 'Lamb Chops 350g', cal: 920, protein: 88, fat: 65, time: '19:30' },
  },
  3: {
    breakfast: { name: 'Ribeye Steak + Scrambled Eggs', cal: 900, protein: 92, fat: 62, time: '07:00' },
    lunch: { name: 'Salmon Panggang + Bacon', cal: 910, protein: 67, fat: 67, time: '12:00' },
    dinner: { name: 'T-Bone Steak 350g', cal: 850, protein: 84, fat: 60, time: '19:00' },
  },
  4: {
    breakfast: { name: 'Telur 4 Butir + Bacon Crispy', cal: 560, protein: 38, fat: 44, time: '08:00' },
    lunch: { name: 'Tuna Steak Bakar 300g', cal: 390, protein: 84, fat: 3, time: '12:30' },
    dinner: { name: 'Ribeye + Pork Belly', cal: 980, protein: 82, fat: 75, time: '19:00' },
  },
  5: {
    breakfast: { name: 'Bone Broth + Scrambled 3 Telur', cal: 340, protein: 28, fat: 24, time: '09:00' },
    lunch: { name: 'Ayam Panggang Crispy x2 paha', cal: 1040, protein: 96, fat: 70, time: '13:00' },
    dinner: { name: 'Sirloin Steak 300g + Keju', cal: 860, protein: 82, fat: 60, time: '19:00' },
  },
  6: {
    breakfast: { name: 'Telur 5 Butir Goreng Mentega', cal: 490, protein: 35, fat: 38, time: '09:00' },
    lunch: { name: 'Ground Beef + Beef Liver', cal: 640, protein: 54, fat: 46, time: '13:30' },
    dinner: { name: 'Wagyu / Ribeye Spesial 300g', cal: 820, protein: 72, fat: 58, time: '19:00' },
  },
};

export const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
export const DAYS_SHORT = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
