import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  'https://zpqdwrwmgualomsihngl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjk0NjQ0MCwiZXhwIjoxOTM4NTIyNDQwfQ.f7FXT6ZTRoQI4EOIxDf0v09HWChg8qktOC8yz8fAunQ'
);