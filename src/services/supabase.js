import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ftlfpzomxetqtrfrjxnz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bGZwem9teGV0cXRyZnJqeG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1ODEzNDksImV4cCI6MjAwOTE1NzM0OX0.umnfHgpcBhxQO3xKoiV3tu6rXD2LIwO7ITwCfzwz-3s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
