# Дизайн-система NOOW

## Общие принципы

### Философия дизайна
- **Минимализм**: чистые линии, много пространства
- **Техно-футуризм**: неоновые акценты, темная тема
- **Научность**: точность, структурированность, данные
- **Геймификация**: достижения, прогресс, мотивация

### Цветовая палитра

#### Основные цвета
```css
/* Фон */
--background-primary: #0A0A0A
--background-secondary: rgba(255, 255, 255, 0.02)
--background-tertiary: rgba(255, 255, 255, 0.03)

/* Акцентный цвет */
--accent-primary: #FF6B35
--accent-secondary: #E55A2B
--accent-tertiary: rgba(255, 107, 53, 0.08)

/* Текст */
--text-primary: #FFFFFF
--text-secondary: rgba(255, 255, 255, 0.6)
--text-tertiary: rgba(255, 255, 255, 0.4)
--text-muted: rgba(255, 255, 255, 0.3)

/* Границы */
--border-primary: rgba(255, 255, 255, 0.05)
--border-secondary: rgba(255, 255, 255, 0.08)
--border-accent: rgba(255, 107, 53, 0.15)

/* Состояния */
--error: #EF4444
--error-bg: rgba(239, 68, 68, 0.08)
```

#### Градиенты
```css
/* Основной градиент */
--gradient-primary: linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)

/* Фоновые градиенты */
--gradient-card: linear-gradient(135deg, rgba(255, 107, 53, 0.08) 0%, rgba(255, 107, 53, 0.03) 100%)
```

---

## Типографика

### Шрифтовая семья
```css
font-family: 'Inter'
```

### Размеры и веса
```css
/* Заголовки */
--text-h1: 28px, Inter-Bold, letter-spacing: 3px
--text-h2: 24px, Inter-Bold, letter-spacing: 3px
--text-h3: 18px, Inter-Bold, letter-spacing: 1px

/* Подзаголовки */
--text-subtitle: 12px, Inter-Medium, letter-spacing: 1.5px
--text-subtitle-small: 10px, Inter-Medium, letter-spacing: 1px

/* Основной текст */
--text-body: 13px, Inter-Regular, letter-spacing: 0.3px
--text-body-small: 11px, Inter-Regular, letter-spacing: 0.2px

/* Кнопки и акценты */
--text-button: 12px, Inter-SemiBold, letter-spacing: 1px
--text-accent: 16px, Inter-Bold, letter-spacing: 0.5px

/* Мелкий текст */
--text-caption: 9px, Inter-Regular, letter-spacing: 0.5px
--text-micro: 8px, Inter-Medium, letter-spacing: 1px
```

### Цвета текста
```css
/* Основной текст */
--text-color-primary: #FFFFFF
--text-color-secondary: rgba(255, 255, 255, 0.6)
--text-color-muted: rgba(255, 255, 255, 0.4)
--text-color-disabled: rgba(255, 255, 255, 0.3)

/* Акцентный текст */
--text-color-accent: #FF6B35
--text-color-accent-muted: rgba(255, 107, 53, 0.6)

/* Ошибки */
--text-color-error: #EF4444
```

---

## Компоненты

### Карточки (Cards)

#### Основная карточка
```css
.card {
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px;
}
```

#### Статистическая карточка
```css
.stat-card {
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 12px;
  align-items: center;
}
```

#### Карточка пользователя
```css
.user-card {
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.08) 0%, rgba(255, 107, 53, 0.03) 100%);
  border-radius: 16px;
  border: 1px solid rgba(255, 107, 53, 0.1);
  padding: 16px;
}
```

### Кнопки (Buttons)

#### Основная кнопка
```css
.button-primary {
  background: linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%);
  border-radius: 16px;
  padding: 14px 24px;
  align-items: center;
  justify-content: center;
}

.button-primary-text {
  font-size: 12px;
  font-family: Inter-SemiBold;
  color: #000;
  letter-spacing: 1px;
}
```

#### Вторичная кнопка
```css
.button-secondary {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
}
```

#### Кнопка воспроизведения
```css
.button-play {
  background: linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%);
  border-radius: 32px;
  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;
}
```

### Иконки (Icons)

#### Размеры иконок
```css
--icon-size-small: 16px
--icon-size-medium: 20px
--icon-size-large: 24px
--icon-size-xl: 28px
--icon-size-xxl: 32px
```

#### Контейнеры иконок
```css
.icon-container {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(255, 107, 53, 0.08);
  align-items: center;
  justify-content: center;
}

.icon-container-small {
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #FF6B35;
  align-items: center;
  justify-content: center;
}
```

### Инпуты (Inputs)

#### Текстовые поля
```css
.input {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 13px;
  font-family: Inter-Regular;
  color: #FFFFFF;
}
```

### Переключатели (Switches)

#### Toggle Switch
```css
.switch-track {
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  width: 44px;
  height: 24px;
}

.switch-track-active {
  background-color: #FF6B35;
}

.switch-thumb {
  background-color: #FFFFFF;
  border-radius: 12px;
  width: 20px;
  height: 20px;
}
```

---

## Сетка и отступы

### Базовые отступы
```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 12px
--spacing-lg: 16px
--spacing-xl: 20px
--spacing-xxl: 24px
--spacing-xxxl: 32px
```

### Отступы контейнеров
```css
--container-padding: 20px
--container-padding-large: 24px
--section-margin: 20px
--card-padding: 16px
--card-padding-small: 12px
```

### Радиусы скругления
```css
--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 22px
--radius-xxl: 32px
--radius-circle: 50%
```

---

## Анимации

### Длительности
```css
--duration-fast: 200ms
--duration-normal: 300ms
--duration-slow: 500ms
--duration-very-slow: 1000ms
```

### Кривые анимации
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0, 1, 1)
```

### Типы анимаций
```css
/* Пульсация */
.pulse {
  animation: pulse 1s ease-in-out infinite alternate;
}

/* Прогресс */
.progress {
  animation: progress 300ms ease-out;
}

/* Появление */
.fade-in {
  animation: fadeIn 300ms ease-out;
}

/* Масштабирование */
.scale {
  animation: scale 200ms ease-out;
}
```

---

## Состояния

### Hover состояния
```css
.card:hover {
  background-color: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
}

.button:hover {
  opacity: 0.9;
  transform: scale(0.98);
}
```

### Active состояния
```css
.button:active {
  transform: scale(0.95);
}

.card:active {
  background-color: rgba(255, 255, 255, 0.04);
}
```

### Disabled состояния
```css
.disabled {
  opacity: 0.4;
  pointer-events: none;
}

.disabled-text {
  color: rgba(255, 255, 255, 0.3);
}
```

### Loading состояния
```css
.loading {
  opacity: 0.7;
  pointer-events: none;
}

.skeleton {
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.02) 25%, 
    rgba(255, 255, 255, 0.04) 50%, 
    rgba(255, 255, 255, 0.02) 75%
  );
  background-size: 200% 100%;
  animation: skeleton 1.5s infinite;
}
```

---

## Специфичные компоненты

### Таймер
```css
.timer-circle {
  width: 60vw;
  height: 60vw;
  border-radius: 30vw;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
  justify-content: center;
}

.timer-time {
  font-size: 40px;
  font-family: Inter-Bold;
  color: #FFFFFF;
  letter-spacing: 1px;
}

.progress-ring {
  position: absolute;
  width: 65vw;
  height: 65vw;
  border-radius: 32.5vw;
  border: 2px solid rgba(255, 107, 53, 0.1);
}
```

### Графики
```css
.chart-bar {
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  min-height: 3px;
}

.chart-bar-active {
  background-color: #FF6B35;
}

.chart-bar-inactive {
  background-color: rgba(255, 107, 53, 0.6);
}
```

### Достижения
```css
.achievement-card {
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 12px;
}

.achievement-locked {
  opacity: 0.4;
}

.achievement-badge {
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #FF6B35;
  align-items: center;
  justify-content: center;
}
```

---

## Адаптивность

### Breakpoints
```css
--breakpoint-sm: 320px
--breakpoint-md: 375px
--breakpoint-lg: 414px
--breakpoint-xl: 768px
```

### Responsive размеры
```css
/* Таймер */
--timer-size-sm: 60vw
--timer-size-md: 55vw
--timer-size-lg: 50vw

/* Карточки */
--card-width-sm: calc(100% - 40px)
--card-width-md: calc(100% - 48px)
--card-width-lg: 400px
```

---

## Доступность

### Контрастность
```css
/* Минимальный контраст 4.5:1 */
--text-on-dark: #FFFFFF
--text-on-accent: #000000
--text-muted: rgba(255, 255, 255, 0.6)
```

### Размеры касания
```css
/* Минимум 44x44px для интерактивных элементов */
--touch-target: 44px
--touch-target-large: 64px
```

### Фокус
```css
.focus-visible {
  outline: 2px solid #FF6B35;
  outline-offset: 2px;
}
```

---

## Иконки и иллюстрации

### Стиль иконок
- **Тип**: Line icons (Lucide React Native)
- **Толщина**: 1.5px
- **Размеры**: 16px, 20px, 24px, 28px, 32px
- **Цвета**: #FFFFFF, #FF6B35, rgba(255, 255, 255, 0.6)

### Основные иконки
```css
/* Навигация */
--icon-home: Home
--icon-stats: BarChart3
--icon-profile: User

/* Действия */
--icon-play: Play
--icon-pause: Pause
--icon-skip: SkipForward
--icon-reset: RotateCcw

/* Состояния */
--icon-brain: Brain
--icon-activity: Activity
--icon-coffee: Coffee

/* Настройки */
--icon-settings: Settings
--icon-bell: Bell
--icon-moon: Moon
```

---

## Темы

### Темная тема (по умолчанию)
```css
/* Используется везде в приложении */
--theme-background: #0A0A0A
--theme-surface: rgba(255, 255, 255, 0.02)
--theme-text: #FFFFFF
--theme-accent: #FF6B35
```

### Светлая тема (заготовка)
```css
/* Для будущего использования */
--theme-background-light: #FFFFFF
--theme-surface-light: rgba(0, 0, 0, 0.02)
--theme-text-light: #000000
--theme-accent-light: #FF6B35
```

---

## Гайдлайны использования

### Принципы
1. **Консистентность**: используйте только определенные цвета, размеры и отступы
2. **Иерархия**: четкое разделение заголовков, подзаголовков и основного текста
3. **Пространство**: много воздуха между элементами
4. **Акценты**: используйте оранжевый цвет только для важных элементов

### Запреты
- Не используйте цвета вне палитры
- Не изменяйте размеры шрифтов произвольно
- Не добавляйте тени (используйте только границы)
- Не используйте закругления больше 32px

### Рекомендации
- Всегда используйте Inter шрифт
- Придерживайтесь сетки отступов
- Используйте анимации умеренно
- Тестируйте контрастность 