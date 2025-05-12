/*
  # Add phone number to appointments table

  1. Changes
    - Add phone_number column to appointments table (optional)
*/

ALTER TABLE appointments
ADD COLUMN IF NOT EXISTS phone_number text;