const SUPABASE_URL = "https://zxogpxbuhlywxrrsyxrb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4b2dweGJ1aGx5d3hycnN5eHJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwNzI0NDIsImV4cCI6MjEwNDY0ODQ0Mn0.g8xQbmYqlt6wflNGyW-2C-AzoSsKcdYPN4RVwhEfsjI";

if (typeof supabase !== "undefined") {
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.error("SDK de Supabase no cargado.");
}