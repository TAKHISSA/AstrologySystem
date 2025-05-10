-- Gerekli extension'ları etkinleştir
create extension if not exists http with schema net;
create extension if not exists http_request;
-- HTTP Extension'ı ekleyin (pg_net)
create extension if not exists pg_net;

-- E-posta gönderme fonksiyonu
-- Güncellenmiş fonksiyon
CREATE OR REPLACE FUNCTION send_verification_email(p_email text, p_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_subject text := 'Randevu Doğrulama Kodu';
  v_html_content text;
  v_response jsonb;
BEGIN
  -- HTML e-posta içeriğini oluştur
  v_html_content := '
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #4F46E5;">Randevu Doğrulama Kodu</h2>
      <p>Merhaba,</p>
      <p>Randevu talebiniz için doğrulama kodunuz:</p>
      <div style="background-color: #F3F4F6; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 3px;">' || p_code || '</span>
      </div>
      <p>Bu kod 10 dakika süreyle geçerlidir.</p>
      <p>Eğer bu talebi siz yapmadıysanız, bu e-postayı dikkate almayınız.</p>
      <p>Saygılarımızla,<br>Astroloji Danışmanlık</p>
    </div>
  ';

  -- Supabase'in pg_net.http_post fonksiyonunu kullanarak e-posta gönder
  v_response := pg_net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.resend_api_key'),
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'from', 'Astroloji Danışmanlık <destek.balzamikruh@gmail.com>',
      'to', p_email,
      'subject', v_subject,
      'html', v_html_content
    )
  );

  -- Gönderim başarılıysa true döndür
  IF v_response->>'status' = 'success' THEN
    RETURN true;
  ELSE
    RAISE EXCEPTION 'E-posta gönderilirken bir hata oluştu: %', v_response;
  END IF;

EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'E-posta gönderilirken bir hata oluştu: %', SQLERRM;
END;
$$;
