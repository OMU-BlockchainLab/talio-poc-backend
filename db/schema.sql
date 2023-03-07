--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.5 (Debian 13.5-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: enum_change_email_password_requests_state; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_change_email_password_requests_state AS ENUM (
    'pending',
    'processed'
);


--
-- Name: enum_defi_transactions_kind; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_defi_transactions_kind AS ENUM (
    'stake',
    'unstake',
    'internalFee',
    'swap',
    'approveSpent'
);


--
-- Name: enum_defi_transactions_state; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_defi_transactions_state AS ENUM (
    'pending',
    'mined',
    'failed'
);


--
-- Name: enum_email_confirmation_requests_state; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_email_confirmation_requests_state AS ENUM (
    'pending',
    'processed'
);


--
-- Name: enum_email_credentials_state; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_email_credentials_state AS ENUM (
    'pending',
    'active',
    'deactivated'
);


--
-- Name: enum_requests_state; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_requests_state AS ENUM (
    'pending',
    'accepted',
    'declined'
);


--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_users_role AS ENUM (
    'superAdmin',
    'admin',
    'user'
);


--
-- Name: enum_users_state; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_users_state AS ENUM (
    'active',
    'deactivated'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _sequelize_meta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._sequelize_meta (
    name character varying(255) NOT NULL
);


--
-- Name: auth_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_tokens (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    access_key character varying(255) NOT NULL,
    access_expires_at timestamp with time zone NOT NULL,
    refresh_key character varying(255),
    refresh_expires_at timestamp with time zone,
    origin jsonb
);


--
-- Name: change_email_password_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.change_email_password_requests (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email_credential_id uuid NOT NULL,
    state public.enum_change_email_password_requests_state DEFAULT 'pending'::public.enum_change_email_password_requests_state NOT NULL,
    token character varying(255) NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    processed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contacts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    creator_id uuid NOT NULL,
    user_id uuid NOT NULL,
    phone character varying(255),
    blocked_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    nickname character varying(255),
    block_reason text
);


--
-- Name: defi_transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.defi_transactions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tx_id character varying(255) NOT NULL,
    wallet_id uuid NOT NULL,
    stake_id uuid,
    staking_wizard_id uuid,
    kind public.enum_defi_transactions_kind NOT NULL,
    state public.enum_defi_transactions_state DEFAULT 'pending'::public.enum_defi_transactions_state NOT NULL,
    receipt jsonb,
    meta jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: email_confirmation_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.email_confirmation_requests (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email_credential_id uuid NOT NULL,
    state public.enum_email_confirmation_requests_state DEFAULT 'pending'::public.enum_email_confirmation_requests_state NOT NULL,
    token character varying(255) NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    processed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: email_credentials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.email_credentials (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    state public.enum_email_credentials_state DEFAULT 'pending'::public.enum_email_credentials_state NOT NULL,
    email public.citext NOT NULL,
    password_digest character varying(255),
    confirmed_at timestamp with time zone,
    deactivated_at timestamp with time zone,
    is_primary boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: invites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.invites (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    creator_id uuid NOT NULL,
    invited_user_id uuid,
    invited_phone character varying(255),
    invite_token character varying(255) NOT NULL,
    accepted_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: login_credentials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.login_credentials (
    user_id uuid NOT NULL,
    login character varying(255) NOT NULL,
    password_digest character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    memo_digest character varying(255)
);


--
-- Name: requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.requests (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    from_user_id uuid NOT NULL,
    from_address character varying(255),
    to_user_id uuid NOT NULL,
    to_address character varying(255),
    coin character varying(255) NOT NULL,
    amount character varying(255) NOT NULL,
    state public.enum_requests_state DEFAULT 'pending'::public.enum_requests_state NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    transaction_id uuid
);


--
-- Name: stake_statistics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stake_statistics (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    stake_id uuid NOT NULL,
    wallet_id uuid NOT NULL,
    staked double precision NOT NULL,
    price_usd double precision,
    date timestamp with time zone NOT NULL
);


--
-- Name: stakes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stakes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    pool character varying(255) NOT NULL,
    wallet_id uuid NOT NULL,
    total_amount double precision NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: staking_pools; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.staking_pools (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    apy integer,
    apr integer,
    meta jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: COLUMN staking_pools.apy; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.staking_pools.apy IS 'Percent, multiplied by 100 (12.34% = 1234)';


--
-- Name: COLUMN staking_pools.apr; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.staking_pools.apr IS 'Percent, multiplied by 100 (12.34% = 1234)';


--
-- Name: staking_wizards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.staking_wizards (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    stake_id uuid NOT NULL,
    amount double precision NOT NULL,
    internal_fee_collected boolean DEFAULT false NOT NULL,
    completed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: system_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.system_settings (
    key text NOT NULL,
    value text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transactions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    from_user_id uuid NOT NULL,
    to_user_id uuid NOT NULL,
    hash character varying(255) NOT NULL,
    coin character varying(255) NOT NULL,
    amount character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    from_address character varying(255),
    to_address character varying(255),
    channel_id uuid
);


--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_profiles (
    user_id uuid NOT NULL,
    nickname character varying(255),
    status_message character varying(256),
    photo_url character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    background_url character varying(255)
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    state public.enum_users_state DEFAULT 'active'::public.enum_users_state NOT NULL,
    role public.enum_users_role DEFAULT 'user'::public.enum_users_role,
    onboarding_steps jsonb,
    onboarding_completed_at timestamp with time zone,
    deactivated_at timestamp with time zone,
    last_login_at timestamp with time zone,
    is_two_factor_auth_enabled boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    group_only_contacts boolean DEFAULT false NOT NULL,
    deactivation_at timestamp with time zone
);


--
-- Name: wallets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wallets (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    address character varying(255) NOT NULL,
    coin character varying(255) NOT NULL,
    tw_id character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: _sequelize_meta _sequelize_meta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._sequelize_meta
    ADD CONSTRAINT _sequelize_meta_pkey PRIMARY KEY (name);


--
-- Name: auth_tokens auth_tokens_access_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_tokens
    ADD CONSTRAINT auth_tokens_access_key_key UNIQUE (access_key);


--
-- Name: auth_tokens auth_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_tokens
    ADD CONSTRAINT auth_tokens_pkey PRIMARY KEY (id);


--
-- Name: auth_tokens auth_tokens_refresh_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_tokens
    ADD CONSTRAINT auth_tokens_refresh_key_key UNIQUE (refresh_key);


--
-- Name: change_email_password_requests change_email_password_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.change_email_password_requests
    ADD CONSTRAINT change_email_password_requests_pkey PRIMARY KEY (id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: defi_transactions defi_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.defi_transactions
    ADD CONSTRAINT defi_transactions_pkey PRIMARY KEY (id);


--
-- Name: email_confirmation_requests email_confirmation_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_confirmation_requests
    ADD CONSTRAINT email_confirmation_requests_pkey PRIMARY KEY (id);


--
-- Name: email_credentials email_credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_credentials
    ADD CONSTRAINT email_credentials_pkey PRIMARY KEY (id);


--
-- Name: invites invites_invite_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invites
    ADD CONSTRAINT invites_invite_token_key UNIQUE (invite_token);


--
-- Name: invites invites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invites
    ADD CONSTRAINT invites_pkey PRIMARY KEY (id);


--
-- Name: login_credentials login_credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login_credentials
    ADD CONSTRAINT login_credentials_pkey PRIMARY KEY (user_id);


--
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);


--
-- Name: stake_statistics stake_statistics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stake_statistics
    ADD CONSTRAINT stake_statistics_pkey PRIMARY KEY (id);


--
-- Name: stakes stakes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stakes
    ADD CONSTRAINT stakes_pkey PRIMARY KEY (id);


--
-- Name: staking_pools staking_pools_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staking_pools
    ADD CONSTRAINT staking_pools_name_key UNIQUE (name);


--
-- Name: staking_pools staking_pools_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staking_pools
    ADD CONSTRAINT staking_pools_pkey PRIMARY KEY (id);


--
-- Name: staking_wizards staking_wizards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staking_wizards
    ADD CONSTRAINT staking_wizards_pkey PRIMARY KEY (id);


--
-- Name: system_settings system_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_settings
    ADD CONSTRAINT system_settings_pkey PRIMARY KEY (key);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: wallets wallets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallets_pkey PRIMARY KEY (id);


--
-- Name: contacts_user_id_creator_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX contacts_user_id_creator_id ON public.contacts USING btree (user_id, creator_id) WHERE (deleted_at IS NULL);


--
-- Name: defi_transactions_kind; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX defi_transactions_kind ON public.defi_transactions USING btree (kind);


--
-- Name: defi_transactions_stake_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX defi_transactions_stake_id ON public.defi_transactions USING btree (stake_id);


--
-- Name: defi_transactions_staking_wizard_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX defi_transactions_staking_wizard_id ON public.defi_transactions USING btree (staking_wizard_id);


--
-- Name: defi_transactions_tx_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX defi_transactions_tx_id ON public.defi_transactions USING btree (tx_id);


--
-- Name: defi_transactions_wallet_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX defi_transactions_wallet_id ON public.defi_transactions USING btree (wallet_id);


--
-- Name: email_credentials_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX email_credentials_email ON public.email_credentials USING btree (email) WHERE ((state = 'active'::public.enum_email_credentials_state) AND (deleted_at IS NULL));


--
-- Name: email_credentials_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX email_credentials_user_id ON public.email_credentials USING btree (user_id) WHERE ((is_primary = true) AND (deleted_at IS NULL));


--
-- Name: email_credentials_user_id_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX email_credentials_user_id_email ON public.email_credentials USING btree (user_id, email) WHERE (deleted_at IS NULL);


--
-- Name: invites_invited_user_id_creator_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX invites_invited_user_id_creator_id ON public.invites USING btree (invited_user_id, creator_id) WHERE (deleted_at IS NULL);


--
-- Name: login_credentials_login; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX login_credentials_login ON public.login_credentials USING btree (login) WHERE (deleted_at IS NULL);


--
-- Name: login_credentials_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX login_credentials_user_id ON public.login_credentials USING btree (user_id) WHERE (deleted_at IS NULL);


--
-- Name: stake_statistics_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX stake_statistics_date ON public.stake_statistics USING btree (date);


--
-- Name: stake_statistics_stake_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX stake_statistics_stake_id ON public.stake_statistics USING btree (stake_id);


--
-- Name: stake_statistics_stake_id_date; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX stake_statistics_stake_id_date ON public.stake_statistics USING btree (stake_id, date);


--
-- Name: stake_statistics_wallet_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX stake_statistics_wallet_id ON public.stake_statistics USING btree (wallet_id);


--
-- Name: stakes_pool_wallet_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX stakes_pool_wallet_id ON public.stakes USING btree (pool, wallet_id) WHERE (deleted_at IS NULL);


--
-- Name: staking_pools_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX staking_pools_name ON public.staking_pools USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: staking_wizards_stake_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX staking_wizards_stake_id ON public.staking_wizards USING btree (stake_id) WHERE ((completed_at IS NULL) AND (deleted_at IS NULL));


--
-- Name: system_settings_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX system_settings_deleted_at ON public.system_settings USING btree (deleted_at);


--
-- Name: trgm_idx_user_profiles_nickname; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX trgm_idx_user_profiles_nickname ON public.user_profiles USING gin (nickname public.gin_trgm_ops);


--
-- Name: wallets_user_id_address_coin; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX wallets_user_id_address_coin ON public.wallets USING btree (user_id, address, coin) WHERE (deleted_at IS NULL);


--
-- Name: auth_tokens auth_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_tokens
    ADD CONSTRAINT auth_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: change_email_password_requests change_email_password_requests_email_credential_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.change_email_password_requests
    ADD CONSTRAINT change_email_password_requests_email_credential_id_fkey FOREIGN KEY (email_credential_id) REFERENCES public.email_credentials(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: contacts contacts_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: contacts contacts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: defi_transactions defi_transactions_stake_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.defi_transactions
    ADD CONSTRAINT defi_transactions_stake_id_fkey FOREIGN KEY (stake_id) REFERENCES public.stakes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: defi_transactions defi_transactions_staking_wizard_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.defi_transactions
    ADD CONSTRAINT defi_transactions_staking_wizard_id_fkey FOREIGN KEY (staking_wizard_id) REFERENCES public.staking_wizards(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: defi_transactions defi_transactions_wallet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.defi_transactions
    ADD CONSTRAINT defi_transactions_wallet_id_fkey FOREIGN KEY (wallet_id) REFERENCES public.wallets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: email_confirmation_requests email_confirmation_requests_email_credential_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_confirmation_requests
    ADD CONSTRAINT email_confirmation_requests_email_credential_id_fkey FOREIGN KEY (email_credential_id) REFERENCES public.email_credentials(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: email_credentials email_credentials_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_credentials
    ADD CONSTRAINT email_credentials_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: invites invites_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invites
    ADD CONSTRAINT invites_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: invites invites_invited_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invites
    ADD CONSTRAINT invites_invited_user_id_fkey FOREIGN KEY (invited_user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: login_credentials login_credentials_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login_credentials
    ADD CONSTRAINT login_credentials_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: requests requests_from_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: requests requests_to_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: requests requests_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stake_statistics stake_statistics_stake_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stake_statistics
    ADD CONSTRAINT stake_statistics_stake_id_fkey FOREIGN KEY (stake_id) REFERENCES public.stakes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stake_statistics stake_statistics_wallet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stake_statistics
    ADD CONSTRAINT stake_statistics_wallet_id_fkey FOREIGN KEY (wallet_id) REFERENCES public.wallets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: stakes stakes_wallet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stakes
    ADD CONSTRAINT stakes_wallet_id_fkey FOREIGN KEY (wallet_id) REFERENCES public.wallets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: staking_wizards staking_wizards_stake_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staking_wizards
    ADD CONSTRAINT staking_wizards_stake_id_fkey FOREIGN KEY (stake_id) REFERENCES public.stakes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: transactions transactions_from_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: transactions transactions_to_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: wallets wallets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

