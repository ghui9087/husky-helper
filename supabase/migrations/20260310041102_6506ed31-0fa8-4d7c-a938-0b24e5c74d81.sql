CREATE TABLE public.guest_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  message_count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_guest_rate_limits_ip ON public.guest_rate_limits (ip_address);

ALTER TABLE public.guest_rate_limits ENABLE ROW LEVEL SECURITY;

-- No RLS policies needed - only accessed via service role in edge function