import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ychyvwtrnbvgtlklxsjq.supabase.co"
const supabaseKey = "sb_publishable_FztzOsQMayuuholSbmDxGQ_K_BFFhu6"

export const supabase = createClient(supabaseUrl, supabaseKey)