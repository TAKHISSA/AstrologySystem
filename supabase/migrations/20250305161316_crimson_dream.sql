/*
  # Remove Email Function and Update Schema

  1. Changes
    - Remove the send_verification_email function as we're handling verification at the application level
    - Keep the verification_codes and appointments tables as they are
*/

-- Drop the function if it exists
