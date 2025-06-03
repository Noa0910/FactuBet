import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfulzyqcstorffrandlm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmdWx6eXFjc3RvcmZmcmFuZGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MzM5NDQsImV4cCI6MjA2NDQwOTk0NH0.U8rkQWIYNDxmsPopYfU-LNlA8ly6QzUw5Zn0LQlnPHM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 