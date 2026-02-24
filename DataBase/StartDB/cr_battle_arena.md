# 📝 Полная база данных SQL для игры Clash Royale

## 🔴 Папка `teams/red/`

---

### `01_clans.sql`
```sql
-- Таблица кланов
-- Хранит информацию о сообществах игроков

CREATE TABLE Clans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    trophies INTEGER DEFAULT 0,
    required_trophies INTEGER DEFAULT 0,
    max_members INTEGER DEFAULT 50,
    members_count INTEGER DEFAULT 0,
    region TEXT,
    language TEXT DEFAULT 'Russian',
    war_trophies INTEGER DEFAULT 0,
    clan_chest INTEGER DEFAULT 0,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_open BOOLEAN DEFAULT 1,
    badge_url TEXT
);

-- Добавляем тестовые данные
INSERT INTO Clans (name, description, trophies, required_trophies, region, war_trophies) VALUES
    ('Красные Драконы', 'Топ клан для активных', 15200, 4000, 'Europe', 1250),
    ('Синие Варвары', 'Wars daily!', 14800, 3500, 'Russia', 980),
    ('Золотые Рыцари', 'Only legends', 16300, 5000, 'Europe', 1560);
```

---

### `02_players.sql`
```sql
-- Таблица игроков
-- Хранит профили пользователей

CREATE TABLE Players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT NOT NULL UNIQUE,
    level INTEGER CHECK(level BETWEEN 1 AND 14) DEFAULT 1,
    experience INTEGER DEFAULT 0,
    trophies INTEGER DEFAULT 0,
    highest_trophies INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    three_crown_wins INTEGER DEFAULT 0,
    favourite_card_id INTEGER,
    arena TEXT DEFAULT 'Training Camp',
    clan_id INTEGER,
    join_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
    donations INTEGER DEFAULT 0,
    card_collected INTEGER DEFAULT 0,
    FOREIGN KEY (clan_id) REFERENCES Clans(id),
    FOREIGN KEY (favourite_card_id) REFERENCES Cards(id)
);

-- Добавляем тестовые данные
INSERT INTO Players (nickname, level, trophies, wins, losses, arena, clan_id) VALUES
    ('DragonSlayer', 12, 5200, 1250, 320, 'Legendary Arena', 1),
    ('WizardKing', 14, 5800, 1580, 410, 'Legendary Arena', 2),
    ('BarbarianQueen', 10, 4300, 890, 210, 'Spooky Town', 1),
    ('KnightRider', 8, 3200, 560, 180, 'Jungle Arena', 3),
    ('ArcherQueen', 13, 5600, 1420, 380, 'Legendary Arena', NULL);
```

---

### `03_cards.sql`
```sql
-- Таблица карт
-- Хранит все игровые карты

CREATE TABLE Cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    elixir_cost INTEGER CHECK(elixir_cost BETWEEN 1 AND 9),
    rarity TEXT CHECK(rarity IN ('Common', 'Rare', 'Epic', 'Legendary', 'Champion')),
    type TEXT CHECK(type IN ('Troop', 'Spell', 'Building')),
    arena_unlock TEXT,
    description TEXT,
    hitpoints INTEGER,
    damage INTEGER,
    hit_speed REAL,
    range INTEGER,
    target TEXT,
    release_date DATE,
    is_available BOOLEAN DEFAULT 1
);

-- Добавляем тестовые данные
INSERT INTO Cards (name, elixir_cost, rarity, type, arena_unlock, damage, hitpoints) VALUES
    ('Хог Райдер', 4, 'Rare', 'Troop', 'Arena 4', 180, 1400),
    ('Мега Рыцарь', 7, 'Legendary', 'Troop', 'Arena 7', 220, 3300),
    ('Стрелы', 3, 'Common', 'Spell', 'Training Camp', 240, 0),
    ('Ведьма', 5, 'Epic', 'Troop', 'Arena 2', 150, 700),
    ('Замораживание', 4, 'Epic', 'Spell', 'Arena 8', 0, 0),
    ('Электродух', 1, 'Common', 'Troop', 'Arena 11', 90, 200),
    ('Королевский призрак', 3, 'Legendary', 'Troop', 'Arena 11', 180, 1000);
```

---

### `04_battles.sql`
```sql
-- Таблица сражений
-- Хранит историю битв между игроками

CREATE TABLE Battles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    winner_id INTEGER NOT NULL,
    loser_id INTEGER NOT NULL,
    battle_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    duration_seconds INTEGER CHECK(duration_seconds > 0),
    arena TEXT,
    winner_trophies_change INTEGER DEFAULT 30,
    loser_trophies_change INTEGER DEFAULT -30,
    winner_crowns INTEGER DEFAULT 3,
    loser_crowns INTEGER DEFAULT 0,
    winner_tower_hp INTEGER,
    loser_tower_hp INTEGER,
    replay_url TEXT,
    game_mode TEXT DEFAULT '1v1',
    tournament_id INTEGER,
    FOREIGN KEY (winner_id) REFERENCES Players(id) ON DELETE CASCADE,
    FOREIGN KEY (loser_id) REFERENCES Players(id) ON DELETE CASCADE,
    CHECK (winner_id != loser_id)
);

-- Добавляем тестовые данные
INSERT INTO Battles (winner_id, loser_id, duration_seconds, arena, winner_crowns, loser_crowns) VALUES
    (1, 2, 187, 'Legendary Arena', 3, 1),
    (3, 4, 203, 'Spooky Town', 3, 0),
    (2, 5, 156, 'Legendary Arena', 3, 2),
    (4, 1, 245, 'Jungle Arena', 3, 1);
```

---

### `05_player_cards.sql`
```sql
-- Таблица коллекции карт игроков
-- Связующая таблица между игроками и картами

CREATE TABLE PlayerCards (
    player_id INTEGER NOT NULL,
    card_id INTEGER NOT NULL,
    level INTEGER CHECK(level BETWEEN 1 AND 14) DEFAULT 1,
    count INTEGER DEFAULT 1,
    is_favorite BOOLEAN DEFAULT 0,
    date_obtained DATETIME DEFAULT CURRENT_TIMESTAMP,
    upgraded_count INTEGER DEFAULT 0,
    last_upgraded DATETIME,
    PRIMARY KEY (player_id, card_id),
    FOREIGN KEY (player_id) REFERENCES Players(id) ON DELETE CASCADE,
    FOREIGN KEY (card_id) REFERENCES Cards(id) ON DELETE CASCADE
);

-- Добавляем тестовые данные
INSERT INTO PlayerCards (player_id, card_id, level, count, is_favorite) VALUES
    (1, 1, 13, 120, 1),
    (1, 4, 12, 80, 0),
    (2, 2, 14, 5, 1),
    (3, 3, 11, 500, 0),
    (5, 6, 13, 200, 1),
    (2, 1, 12, 45, 0),
    (3, 5, 10, 23, 0);
```

---

### `06_decks.sql`
```sql
-- Таблица колод
-- Хранит колоды игроков (8 карт в каждой)

CREATE TABLE Decks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    card1_id INTEGER NOT NULL,
    card2_id INTEGER NOT NULL,
    card3_id INTEGER NOT NULL,
    card4_id INTEGER NOT NULL,
    card5_id INTEGER NOT NULL,
    card6_id INTEGER NOT NULL,
    card7_id INTEGER NOT NULL,
    card8_id INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT 0,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_used DATETIME,
    wins_count INTEGER DEFAULT 0,
    losses_count INTEGER DEFAULT 0,
    average_elixir REAL,
    FOREIGN KEY (player_id) REFERENCES Players(id) ON DELETE CASCADE,
    FOREIGN KEY (card1_id) REFERENCES Cards(id),
    FOREIGN KEY (card2_id) REFERENCES Cards(id),
    FOREIGN KEY (card3_id) REFERENCES Cards(id),
    FOREIGN KEY (card4_id) REFERENCES Cards(id),
    FOREIGN KEY (card5_id) REFERENCES Cards(id),
    FOREIGN KEY (card6_id) REFERENCES Cards(id),
    FOREIGN KEY (card7_id) REFERENCES Cards(id),
    FOREIGN KEY (card8_id) REFERENCES Cards(id)
);

-- Добавляем тестовые данные
INSERT INTO Decks (player_id, name, card1_id, card2_id, card3_id, card4_id, card5_id, card6_id, card7_id, card8_id, is_active, average_elixir) VALUES
    (1, 'Мета-колода 2024', 1, 2, 3, 4, 5, 6, 7, 2, 1, 3.5),
    (2, 'Контроль', 2, 3, 4, 5, 6, 7, 1, 3, 1, 3.8),
    (3, 'Быстрая', 3, 4, 5, 6, 7, 1, 2, 4, 0, 2.9);
```

---

### `07_tournaments.sql`
```sql
-- Таблица турниров
-- Хранит информацию о турнирах

CREATE TABLE Tournaments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    max_players INTEGER DEFAULT 50,
    registered_players INTEGER DEFAULT 0,
    start_date DATETIME NOT NULL,
    end_date DATETIME,
    prize_pool TEXT,
    entry_fee INTEGER DEFAULT 0,
    created_by INTEGER,
    status TEXT CHECK(status IN ('Registration', 'Active', 'Finished')) DEFAULT 'Registration',
    arena TEXT,
    FOREIGN KEY (created_by) REFERENCES Players(id)
);

-- Добавляем тестовые данные
INSERT INTO Tournaments (name, max_players, start_date, prize_pool, entry_fee, arena) VALUES
    ('Friday Night Fights', 100, '2024-03-01 18:00:00', '1000 Gems', 10, 'Legendary Arena'),
    ('Weekend Warriors', 50, '2024-03-02 15:00:00', '500 Gems', 5, 'Spooky Town'),
    ('Noob Friendly', 32, '2024-03-03 12:00:00', '100 Gems', 0, 'Training Camp');
```

---

### `08_achievements.sql`
```sql
-- Таблица достижений игроков

CREATE TABLE Achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    achievement_name TEXT NOT NULL,
    description TEXT,
    date_earned DATETIME DEFAULT CURRENT_TIMESTAMP,
    gems_reward INTEGER DEFAULT 0,
    experience_reward INTEGER DEFAULT 0,
    achievement_type TEXT,
    progress INTEGER DEFAULT 0,
    max_progress INTEGER DEFAULT 100,
    is_completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES Players(id) ON DELETE CASCADE
);

-- Добавляем тестовые данные
INSERT INTO Achievements (player_id, achievement_name, gems_reward, experience_reward, progress, is_completed) VALUES
    (1, 'Победитель арены', 50, 1000, 100, 1),
    (1, 'Коллекционер карт', 25, 500, 75, 0),
    (2, 'Мастер сражений', 100, 2000, 100, 1),
    (3, 'Победитель турнира', 75, 1500, 100, 1),
    (5, 'Собиратель сундуков', 30, 600, 40, 0);
```

---

### `09_shop.sql`
```sql
-- Таблица магазина
-- Хранит доступные предметы в магазине

CREATE TABLE Shop (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    item_type TEXT CHECK(item_type IN ('Chest', 'Card', 'Gem', 'Gold', 'Emote')),
    price_gems INTEGER,
    price_gold INTEGER,
    quantity INTEGER DEFAULT 1,
    available_from DATETIME DEFAULT CURRENT_TIMESTAMP,
    available_until DATETIME,
    is_limited BOOLEAN DEFAULT 0,
    is_special_offer BOOLEAN DEFAULT 0,
    discount_percent INTEGER DEFAULT 0,
    image_url TEXT
);

-- Добавляем тестовые данные
INSERT INTO Shop (item_name, item_type, price_gems, price_gold, is_special_offer, discount_percent) VALUES
    ('Сундук с сокровищами', 'Chest', 500, NULL, 0, 0),
    ('Мега сундук', 'Chest', 1500, NULL, 1, 20),
    ('1000 золота', 'Gold', NULL, 1000, 0, 0),
    ('Легендарная карта', 'Card', 5000, NULL, 1, 15),
    ('Смайлик "Король"', 'Emote', 250, NULL, 0, 0);
```

---

### `10_chests.sql`
```sql
-- Таблица сундуков игроков
-- Хранит информацию о сундуках в очереди

CREATE TABLE Chests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    chest_type TEXT CHECK(chest_type IN ('Silver', 'Gold', 'Giant', 'Magical', 'Legendary')),
    arena TEXT,
    position INTEGER DEFAULT 1,
    unlock_start DATETIME,
    unlock_end DATETIME,
    is_unlocked BOOLEAN DEFAULT 0,
    is_opened BOOLEAN DEFAULT 0,
    gems_to_open INTEGER,
    cards_count INTEGER,
    gold_amount INTEGER,
    guaranteed_rare BOOLEAN DEFAULT 0,
    guaranteed_epic BOOLEAN DEFAULT 0,
    guaranteed_legendary BOOLEAN DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES Players(id) ON DELETE CASCADE
);

-- Добавляем тестовые данные
INSERT INTO Chests (player_id, chest_type, arena, position, unlock_start, gems_to_open, cards_count, gold_amount) VALUES
    (1, 'Silver', 'Legendary Arena', 1, DATETIME('now'), 18, 20, 100),
    (1, 'Gold', 'Legendary Arena', 2, NULL, 48, 50, 500),
    (2, 'Magical', 'Legendary Arena', 1, NULL, 144, 100, 1000),
    (3, 'Giant', 'Spooky Town', 1, DATETIME('now'), 72, 70, 700),
    (5, 'Legendary', 'Legendary Arena', 1, NULL, 360, 200, 5000);
```

---

## 🔵 Папка `teams/blue/` - Альтернативная реализация

### `01_clans.sql`
```sql
-- Кланы - альтернативная структура

CREATE TABLE Clans (
    clan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    clan_tag TEXT UNIQUE NOT NULL,
    clan_name TEXT NOT NULL,
    clan_score INTEGER DEFAULT 0,
    clan_war_trophies INTEGER DEFAULT 0,
    member_capacity INTEGER DEFAULT 50,
    current_members INTEGER DEFAULT 0,
    clan_description TEXT,
    clan_type TEXT DEFAULT 'Open',
    location TEXT,
    required_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    clan_badge TEXT
);

INSERT INTO Clans (clan_tag, clan_name, clan_score, location) VALUES
    ('#RC123', 'Red Dragons', 15200, 'Europe'),
    ('#BC456', 'Blue Warriors', 14800, 'Russia'),
    ('#GC789', 'Golden Knights', 16300, 'USA');
```

### `02_players.sql`
```sql
-- Игроки - альтернативная структура

CREATE TABLE Players (
    player_tag TEXT PRIMARY KEY,
    player_name TEXT NOT NULL,
    exp_level INTEGER DEFAULT 1,
    exp_points INTEGER DEFAULT 0,
    trophies INTEGER DEFAULT 0,
    personal_best INTEGER DEFAULT 0,
    total_wins INTEGER DEFAULT 0,
    total_losses INTEGER DEFAULT 0,
    three_crown_wins INTEGER DEFAULT 0,
    current_arena TEXT,
    clan_tag TEXT,
    join_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMP,
    FOREIGN KEY (clan_tag) REFERENCES Clans(clan_tag)
);

INSERT INTO Players (player_tag, player_name, trophies, current_arena, clan_tag) VALUES
    ('#P123', 'DragonMaster', 5200, 'Legendary Arena', '#RC123'),
    ('#P456', 'WizardLord', 5800, 'Legendary Arena', '#BC456'),
    ('#P789', 'KnightKing', 4300, 'Spooky Town', '#GC789');
```

---
