import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zknkavvhncmgtfdrvvod.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprbmthdnZobmNtZ3RmZHJ2dm9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3NzI5NjMsImV4cCI6MjAwNjM0ODk2M30.xHQPxPK5NB4pNT-2gildCpywC-K2cx3dX0KLRawXQ1g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
