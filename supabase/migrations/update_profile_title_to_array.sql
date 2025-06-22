DO $$
BEGIN
  -- Check if the column is not already a TEXT array
  IF NOT EXISTS (
    SELECT 1
    FROM pg_attribute
    JOIN pg_type ON pg_type.oid = pg_attribute.atttypid
    WHERE attrelid = 'public.profiles'::regclass
      AND attname = 'title'
      AND typname = '_text' -- The internal name for a text array
  ) THEN
    -- If it's not an array, alter it
    ALTER TABLE public.profiles
    ALTER COLUMN title TYPE TEXT[]
    USING string_to_array(title, E'\n');
  END IF;
END;
$$; 