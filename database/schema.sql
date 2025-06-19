-- Схема базы данных NOOW
-- Создание таблиц для сбора данных пользователей, циклов, когнитивных тестов и данных здоровья

-- Таблица пользователей
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    consent_given BOOLEAN DEFAULT FALSE,
    test_frequency VARCHAR(20) DEFAULT 'standard' CHECK (test_frequency IN ('minimal', 'standard', 'maximal')),
    health_kit_enabled BOOLEAN DEFAULT FALSE,
    google_fit_enabled BOOLEAN DEFAULT FALSE,
    age INTEGER,
    profession VARCHAR(100),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица циклов работы
CREATE TABLE cycles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    exercise_type VARCHAR(50) DEFAULT 'pushups',
    reps INTEGER DEFAULT 0,
    cycle_duration INTEGER, -- в минутах
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица активаций (микро-движения)
CREATE TABLE activations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cycle_id UUID REFERENCES cycles(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    exercise_type VARCHAR(50) NOT NULL,
    reps INTEGER DEFAULT 0,
    duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица когнитивных тестов
CREATE TABLE cog_tests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    test_type VARCHAR(20) NOT NULL CHECK (test_type IN ('nback', 'stroop')),
    accuracy DECIMAL(5,2) NOT NULL, -- процент точности
    reaction_time INTEGER, -- время реакции в миллисекундах
    total_questions INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cycle_id UUID REFERENCES cycles(id) ON DELETE SET NULL
);

-- Таблица обратной связи
CREATE TABLE feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cycle_id UUID REFERENCES cycles(id) ON DELETE CASCADE,
    energy_score INTEGER CHECK (energy_score >= 1 AND energy_score <= 5),
    mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 5),
    wellbeing_score INTEGER CHECK (wellbeing_score >= 1 AND wellbeing_score <= 5),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица данных здоровья с носимых устройств
CREATE TABLE health_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    heart_rate INTEGER, -- удары в минуту
    hrv DECIMAL(5,2), -- вариабельность сердечного ритма
    steps INTEGER,
    activity_level INTEGER, -- уровень активности 1-10
    source VARCHAR(20) NOT NULL CHECK (source IN ('healthkit', 'googlefit')),
    cycle_id UUID REFERENCES cycles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица отслеживания источников трафика
CREATE TABLE acquisition (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_term VARCHAR(100),
    utm_content VARCHAR(100),
    referrer VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для оптимизации запросов
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_cycles_user_id ON cycles(user_id);
CREATE INDEX idx_cycles_start_time ON cycles(start_time);
CREATE INDEX idx_activations_cycle_id ON activations(cycle_id);
CREATE INDEX idx_cog_tests_user_id ON cog_tests(user_id);
CREATE INDEX idx_cog_tests_timestamp ON cog_tests(timestamp);
CREATE INDEX idx_feedback_cycle_id ON feedback(cycle_id);
CREATE INDEX idx_health_data_user_id ON health_data(user_id);
CREATE INDEX idx_health_data_timestamp ON health_data(timestamp);
CREATE INDEX idx_acquisition_user_id ON acquisition(user_id);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггер для автоматического обновления updated_at в таблице users
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) политики
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cog_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE acquisition ENABLE ROW LEVEL SECURITY;

-- Политика для пользователей (каждый пользователь видит только свои данные)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Политики для остальных таблиц
CREATE POLICY "Users can view own cycles" ON cycles FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own cycles" ON cycles FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own activations" ON activations FOR SELECT USING (
    EXISTS (SELECT 1 FROM cycles WHERE cycles.id = activations.cycle_id AND cycles.user_id::text = auth.uid()::text)
);
CREATE POLICY "Users can insert own activations" ON activations FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM cycles WHERE cycles.id = activations.cycle_id AND cycles.user_id::text = auth.uid()::text)
);

CREATE POLICY "Users can view own cog_tests" ON cog_tests FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own cog_tests" ON cog_tests FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own feedback" ON feedback FOR SELECT USING (
    EXISTS (SELECT 1 FROM cycles WHERE cycles.id = feedback.cycle_id AND cycles.user_id::text = auth.uid()::text)
);
CREATE POLICY "Users can insert own feedback" ON feedback FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM cycles WHERE cycles.id = feedback.cycle_id AND cycles.user_id::text = auth.uid()::text)
);

CREATE POLICY "Users can view own health_data" ON health_data FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own health_data" ON health_data FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own acquisition" ON acquisition FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own acquisition" ON acquisition FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Представления для аналитики
CREATE VIEW user_stats AS
SELECT 
    u.id,
    u.email,
    u.created_at,
    COUNT(DISTINCT c.id) as total_cycles,
    COUNT(DISTINCT ct.id) as total_tests,
    AVG(ct.accuracy) as avg_accuracy,
    AVG(ct.reaction_time) as avg_reaction_time,
    AVG(f.energy_score) as avg_energy,
    AVG(f.mood_score) as avg_mood
FROM users u
LEFT JOIN cycles c ON u.id = c.user_id
LEFT JOIN cog_tests ct ON u.id = ct.user_id
LEFT JOIN feedback f ON c.id = f.cycle_id
GROUP BY u.id, u.email, u.created_at;

-- Функция для получения статистики пользователя
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE (
    total_cycles BIGINT,
    total_tests BIGINT,
    avg_accuracy DECIMAL,
    avg_reaction_time DECIMAL,
    avg_energy DECIMAL,
    avg_mood DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(DISTINCT c.id)::BIGINT,
        COUNT(DISTINCT ct.id)::BIGINT,
        AVG(ct.accuracy),
        AVG(ct.reaction_time),
        AVG(f.energy_score),
        AVG(f.mood_score)
    FROM users u
    LEFT JOIN cycles c ON u.id = c.user_id
    LEFT JOIN cog_tests ct ON u.id = ct.user_id
    LEFT JOIN feedback f ON c.id = f.cycle_id
    WHERE u.id = user_uuid
    GROUP BY u.id;
END;
$$ LANGUAGE plpgsql; 