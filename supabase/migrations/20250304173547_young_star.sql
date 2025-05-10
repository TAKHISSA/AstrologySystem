/*
  # Create verification codes table and email function

  1. New Tables
    - `verification_codes`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `email` (text)
      - `code` (text)
      - `appointment_date` (date)
      - `client_name` (text)
      - `expires_at` (timestamp)
      - `used` (boolean)
  
  2. New Functions
    - `send_verification_email` - Sends verification email with code
  
  3. Security
    - Enable RLS on `verification_codes` table
    - Add policies for public access
*/

-- Create verification_codes table
CREATE TABLE IF NOT EXISTS verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  email text NOT NULL,
  code text NOT NULL,
  appointment_date date NOT NULL,
  client_name text NOT NULL,
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;



-- Create policy for reading verification codes
CREATE POLICY "Anyone can read verification codes"
  ON verification_codes
  FOR SELECT
  USING (true);

-- Create policy for updating verification codes
CREATE POLICY "Anyone can update verification codes"
  ON verification_codes
  FOR UPDATE
  USING (true);

-- Create function to send verification email
CREATE OR REPLACE FUNCTION send_verification_email(p_email text, p_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- In a real implementation, this would send an actual email
  -- For this demo, we'll just return true to simulate email sending
  -- In production, you would integrate with an email service
  RETURN true;
END;
$$;