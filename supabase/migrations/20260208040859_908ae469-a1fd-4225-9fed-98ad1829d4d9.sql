-- Create payment accounts table for users
CREATE TABLE public.user_payment_accounts (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    provider text NOT NULL, -- bKash, Nagad, Rocket, etc.
    account_number text NOT NULL,
    account_name text,
    is_primary boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(user_id, account_number)
);

-- Create transactions table for tracking all money movements
CREATE TABLE public.transactions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    type text NOT NULL, -- 'deposit', 'withdraw', 'earning', 'referral_bonus', 'package_purchase'
    amount numeric NOT NULL,
    status text NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    payment_method text, -- bKash, Nagad, Rocket
    account_number text,
    transaction_id text, -- User's transaction ID for deposits
    notes text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_payment_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS for payment accounts
CREATE POLICY "Users can view their own payment accounts"
ON public.user_payment_accounts
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment accounts"
ON public.user_payment_accounts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users cannot delete (only admin can via service role)

-- RLS for transactions
CREATE POLICY "Users can view their own transactions"
ON public.transactions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
ON public.transactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_user_payment_accounts_user_id ON public.user_payment_accounts(user_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_type ON public.transactions(type);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);

-- Triggers
CREATE TRIGGER update_user_payment_accounts_updated_at
BEFORE UPDATE ON public.user_payment_accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();