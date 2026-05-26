const foodDb = [
  { keys: ["greek yogurt", "yogurt"], label: "Greek yogurt", calories: 150, protein: 23, carbs: 9, fat: 4, fiber: 0, calcium: 240 },
  { keys: ["oatmeal", "oats"], label: "Oatmeal", calories: 150, protein: 6, carbs: 27, fat: 3, fiber: 4, calcium: 20 },
  { keys: ["berries", "blueberries", "strawberries"], label: "Berries", calories: 70, protein: 1, carbs: 17, fat: 0, fiber: 4, calcium: 25 },
  { keys: ["banana"], label: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0, fiber: 3, calcium: 6 },
  { keys: ["egg", "eggs"], label: "Eggs", calories: 70, protein: 6, carbs: 1, fat: 5, fiber: 0, calcium: 28 },
  { keys: ["chicken"], label: "Chicken", calories: 165, protein: 31, carbs: 0, fat: 4, fiber: 0, calcium: 15 },
  { keys: ["rice"], label: "Rice", calories: 205, protein: 4, carbs: 45, fat: 0, fiber: 1, calcium: 16 },
  { keys: ["salmon"], label: "Salmon", calories: 230, protein: 25, carbs: 0, fat: 12, fiber: 0, calcium: 20 },
  { keys: ["tofu"], label: "Tofu", calories: 180, protein: 17, carbs: 3, fat: 9, fiber: 2, calcium: 350 },
  { keys: ["lentils"], label: "Lentils", calories: 230, protein: 18, carbs: 40, fat: 1, fiber: 16, calcium: 38 },
  { keys: ["beans", "black beans"], label: "Beans", calories: 225, protein: 15, carbs: 41, fat: 1, fiber: 15, calcium: 46 },
  { keys: ["spinach"], label: "Spinach", calories: 25, protein: 3, carbs: 4, fat: 0, fiber: 2, calcium: 99 },
  { keys: ["broccoli"], label: "Broccoli", calories: 55, protein: 4, carbs: 11, fat: 1, fiber: 5, calcium: 62 },
  { keys: ["almond milk"], label: "Fortified almond milk", calories: 35, protein: 1, carbs: 2, fat: 3, fiber: 1, calcium: 450 },
  { keys: ["milk"], label: "Milk", calories: 120, protein: 8, carbs: 12, fat: 5, fiber: 0, calcium: 300 },
  { keys: ["cottage cheese"], label: "Cottage cheese", calories: 180, protein: 25, carbs: 8, fat: 5, fiber: 0, calcium: 140 },
  { keys: ["protein shake", "protein powder"], label: "Protein shake", calories: 140, protein: 25, carbs: 4, fat: 2, fiber: 1, calcium: 120 },
  { keys: ["avocado"], label: "Avocado", calories: 240, protein: 3, carbs: 12, fat: 21, fiber: 10, calcium: 18 },
  { keys: ["sourdough", "toast", "bread"], label: "Bread", calories: 120, protein: 4, carbs: 24, fat: 1, fiber: 2, calcium: 40 },
  { keys: ["cheese"], label: "Cheese", calories: 110, protein: 7, carbs: 1, fat: 9, fiber: 0, calcium: 200 }
];

const quotes = [
  { text: "You do not rise to your goals. You fall to your systems.", source: "James Clear" },
  { text: "The secret of getting ahead is getting started.", source: "Mark Twain" },
  { text: "Energy is earned in the small choices before anyone notices.", source: "good decisions" },
  { text: "A good day starts the night before.", source: "good decisions" },
  { text: "Make the healthy choice the easy choice.", source: "Design principle" }
];

const completionQuotes = [
  { text: "That is a complete day. You made the next one easier.", source: "good decisions" },
  { text: "A full log is not perfection. It is proof that you are paying attention.", source: "good decisions" },
  { text: "Today counts. You kept the promise small enough to keep.", source: "good decisions" },
  { text: "One complete day is a clean vote for the person you are becoming.", source: "good decisions" },
  { text: "Strong work. The streak is built one honest entry at a time.", source: "good decisions" }
];

const challenges = [
  "Finish dinner 2 hours before bed and log how your sleep feels tomorrow.",
  "Add one high-fiber food to your next meal: berries, beans, lentils, greens, or oats.",
  "Do 10 minutes of easy movement after your longest sitting block.",
  "Set a caffeine cutoff and write down whether it changed your sleep.",
  "Prep tomorrow's first protein source before the day starts."
];

const reads = [
  {
    title: "The 10-minute reset",
    text: "When the plan feels too big, shrink the action until it can be done now: prep breakfast, fill the water bottle, or walk around the block."
  },
  {
    title: "The sleep anchor",
    text: "A consistent wake time gives the rest of the system a stable cue. Start there when bedtime feels hard to control."
  },
  {
    title: "Protein early",
    text: "Front-loading protein can make the day simpler: fewer emergency snacks, steadier energy, and clearer dinner choices."
  },
  {
    title: "Easy counts",
    text: "Not every workout has to prove fitness. Easy movement builds the identity and keeps tomorrow available."
  }
];

const targets = {
  protein: 110,
  calories: 2000,
  carbs: 180,
  fat: 70,
  fiber: 25,
  calcium: 1000,
  sleepMinutes: 465,
  movementMinutes: 30,
  deficitLow: 500,
  deficitHigh: 1000
};

const exerciseBurnRates = {
  Bike: { easy: 6, moderate: 8, hard: 11 },
  Strength: { easy: 4, moderate: 6, hard: 8 },
  Walk: { easy: 3, moderate: 4, hard: 5 },
  Yoga: { easy: 2.5, moderate: 3, hard: 4 },
  "Other workout": { easy: 4, moderate: 6, hard: 8 }
};

const storageKeys = {
  today: "steadyToday",
  history: "steadyHistory"
};

const programStartDate = "2026-05-25";

const trendState = {
  view: "weekly"
};

const el = (id) => document.getElementById(id);

function todayISO() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

function addDays(isoDate, offset) {
  const date = new Date(`${isoDate}T12:00:00`);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function daysBetween(startIso, endIso) {
  const start = new Date(`${startIso}T12:00:00`);
  const end = new Date(`${endIso}T12:00:00`);
  return Math.round((end - start) / 86400000);
}

function dateLabel(isoDate, options = { weekday: "short", month: "short", day: "numeric" }) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString([], options);
}

function numberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function formatDuration(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return "--";
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hrs}h ${String(mins).padStart(2, "0")}m`;
}

function formatNumber(value, suffix = "", decimals = 0) {
  if (!Number.isFinite(value)) return "--";
  const fixed = Number(value.toFixed(decimals));
  const display = Number.isInteger(fixed) ? fixed.toFixed(0) : fixed.toFixed(decimals);
  return `${display}${suffix}`;
}

function formatWeight(value) {
  if (!Number.isFinite(value)) return "--";
  const fixed = Number(value.toFixed(1));
  return `${Number.isInteger(fixed) ? fixed.toFixed(0) : fixed.toFixed(1)} lb`;
}

function getProfile() {
  const feet = Number(el("heightFeet").value || 0);
  const inches = Number(el("heightInches").value || 0);
  return {
    sex: el("sex").value,
    ageYears: Number(el("ageYears").value || 0),
    ageMonths: Number(el("ageMonths").value || 0),
    heightFeet: feet,
    heightInches: inches,
    heightTotalInches: feet * 12 + inches
  };
}

function formatHeight(profile) {
  if (!profile.heightFeet && !profile.heightInches) return "--";
  return `${profile.heightFeet || 0}'${profile.heightInches || 0}"`;
}

function formatAge(profile) {
  if (!profile.ageYears) return "--";
  return profile.ageMonths ? `${profile.ageYears}y ${profile.ageMonths}m` : `${profile.ageYears}y`;
}

function calculateBmi(weight, heightTotalInches) {
  if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(heightTotalInches) || heightTotalInches <= 0) return null;
  return (weight / (heightTotalInches * heightTotalInches)) * 703;
}

function formatBmi(value) {
  return Number.isFinite(value) ? value.toFixed(1) : "--";
}

function getBmiCategory(bmi) {
  if (!Number.isFinite(bmi)) return { label: "--", copy: "Add height and weight to calculate BMI." };
  if (bmi < 18.5) return { label: "Underweight range", copy: "This is below the CDC healthy-weight range for adults." };
  if (bmi < 25) return { label: "Healthy weight range", copy: "This is within the CDC healthy-weight range for adults." };
  if (bmi < 30) return { label: "Overweight range", copy: "This is within the CDC overweight range for adults." };
  if (bmi < 35) return { label: "Class 1 obesity range", copy: "This is within the CDC class 1 obesity range for adults." };
  if (bmi < 40) return { label: "Class 2 obesity range", copy: "This is within the CDC class 2 obesity range for adults." };
  return { label: "Class 3 obesity range", copy: "This is within the CDC class 3 obesity range for adults." };
}

function markerPositionForBmi(bmi) {
  if (!Number.isFinite(bmi)) return 0;
  return Math.max(0, Math.min(100, ((bmi - 15) / 25) * 100));
}

function minutesFromTime(time) {
  if (!time || !time.includes(":")) return 0;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getSleepMinutes() {
  const bedtime = minutesFromTime(el("bedtime").value);
  let waketime = minutesFromTime(el("waketime").value);
  if (!bedtime && !waketime) return 0;
  if (waketime <= bedtime) waketime += 24 * 60;
  return Math.max(0, waketime - bedtime);
}

function calculateSleep() {
  const duration = getSleepMinutes();
  const wakeups = Number(el("wakeups").value || 0);
  el("sleepDuration").textContent = formatDuration(duration);
  el("sleepScore").textContent = formatDuration(duration);

  const pill = el("sleepPill");
  if (duration >= targets.sleepMinutes && wakeups <= 1) {
    pill.textContent = "In range";
    pill.classList.remove("muted");
  } else if (duration >= 420) {
    pill.textContent = "Close";
    pill.classList.add("muted");
  } else {
    pill.textContent = "Needs buffer";
    pill.classList.add("muted");
  }

  const wakeText = wakeups === 0 ? "No wakeups logged." : `${wakeups} wakeup${wakeups === 1 ? "" : "s"} logged.`;
  el("sleepInsight").textContent = `${wakeText} Protect the last hour before bed tonight.`;
}

function servingsForFood(text, food) {
  const lower = text.toLowerCase();
  const matchedKey = food.keys.find((key) => lower.includes(key));
  if (!matchedKey) return 0;

  const escaped = matchedKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(?:cups?|servings?|bowls?|pieces?|slices?|eggs?|oz)?\\s+${escaped}`),
    new RegExp(`(half|one|two|three|four)\\s+(?:cups?|servings?|bowls?|pieces?|slices?|eggs?|oz)?\\s*${escaped}`),
    new RegExp(`${escaped}\\s*(?:x|of)?\\s*(\\d+(?:\\.\\d+)?)`)
  ];

  for (const pattern of patterns) {
    const match = lower.match(pattern);
    if (match) {
      const raw = match[1];
      const wordMap = { half: 0.5, one: 1, two: 2, three: 3, four: 4 };
      return Number(wordMap[raw] || raw) || 1;
    }
  }

  if (lower.includes(`1/2 cup ${matchedKey}`) || lower.includes(`1/2 ${matchedKey}`)) return 0.5;
  if (lower.includes(`half cup ${matchedKey}`) || lower.includes(`half ${matchedKey}`)) return 0.5;
  return 1;
}

function estimateNutrition(text) {
  const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, calcium: 0 };
  const matched = [];

  foodDb.forEach((food) => {
    const servings = servingsForFood(text, food);
    if (!servings) return;
    matched.push(`${food.label}${servings === 1 ? "" : ` x${servings}`}`);
    totals.calories += food.calories * servings;
    totals.protein += food.protein * servings;
    totals.carbs += food.carbs * servings;
    totals.fat += food.fat * servings;
    totals.fiber += food.fiber * servings;
    totals.calcium += food.calcium * servings;
  });

  return {
    totals: Object.fromEntries(Object.entries(totals).map(([key, value]) => [key, Math.round(value)])),
    matched
  };
}

function setBar(id, value, target) {
  const percent = Math.min(100, Math.round((value / target) * 100));
  el(id).style.width = `${percent}%`;
}

function estimateExerciseCalories(type = el("exerciseType").value, intensity = el("exerciseIntensity").value, minutes = Number(el("exerciseMinutes").value || 0)) {
  const rateSet = exerciseBurnRates[type] || exerciseBurnRates["Other workout"];
  const rate = rateSet[String(intensity).toLowerCase()] || rateSet.easy;
  return Math.round(minutes * rate);
}

function getCaloriePlan(nutrition = estimateNutrition(el("foodEntry").value).totals) {
  const baselineBurn = Number(el("baselineBurn").value || 0);
  const weeklyLossGoal = Number(el("weeklyLossGoal").value || 1.5);
  const exerciseCalories = estimateExerciseCalories();
  const totalBurn = baselineBurn + exerciseCalories;
  const deficit = totalBurn && nutrition.calories ? totalBurn - nutrition.calories : null;
  const targetDeficit = Math.round((weeklyLossGoal * 3500) / 7);

  return {
    baselineBurn,
    weeklyLossGoal,
    exerciseCalories,
    totalBurn,
    deficit,
    targetDeficit
  };
}

function formatCalories(value) {
  if (!Number.isFinite(value)) return "--";
  return `${Math.round(value).toLocaleString()} kcal`;
}

function updateNutrition() {
  const { totals, matched } = estimateNutrition(el("foodEntry").value);
  const calorieTarget = Number(el("baselineBurn").value || targets.calories);
  el("caloriesValue").textContent = Math.round(totals.calories).toLocaleString();
  el("proteinValue").textContent = `${totals.protein}g`;
  el("carbsValue").textContent = `${totals.carbs}g`;
  el("fatValue").textContent = `${totals.fat}g`;
  el("fiberValue").textContent = `${totals.fiber}g`;
  el("calciumValue").textContent = `${totals.calcium}mg`;
  el("calorieScore").textContent = Math.round(totals.calories).toLocaleString();
  el("proteinScore").textContent = `${totals.protein}g`;
  el("fiberScore").textContent = `${totals.fiber}g`;

  setBar("caloriesBar", totals.calories, calorieTarget);
  setBar("proteinBar", totals.protein, targets.protein);
  setBar("carbsBar", totals.carbs, targets.carbs);
  setBar("fatBar", totals.fat, targets.fat);
  setBar("fiberBar", totals.fiber, targets.fiber);
  setBar("calciumBar", totals.calcium, targets.calcium);

  el("matchedFoods").innerHTML = matched.length
    ? matched.map((item) => `<span>${item}</span>`).join("")
    : "<span>No foods matched yet</span>";

  updateCaloriePlan(totals);
  return totals;
}

function updateCaloriePlan(nutrition = estimateNutrition(el("foodEntry").value).totals) {
  const plan = getCaloriePlan(nutrition);
  const pill = el("deficitPill");

  el("foodCaloriesSummary").textContent = formatCalories(nutrition.calories);
  el("exerciseCaloriesSummary").textContent = formatCalories(plan.exerciseCalories);
  el("deficitTarget").textContent = `${formatCalories(plan.targetDeficit)}/day`;
  el("deficitScoreSub").textContent = `target ${targets.deficitLow}-${targets.deficitHigh}`;

  if (!Number.isFinite(plan.deficit)) {
    el("deficitValue").textContent = "--";
    el("deficitScore").textContent = "--";
    pill.textContent = "Set burn";
    pill.classList.add("muted");
    el("deficitInsight").textContent = "Set your baseline burn and log food to estimate a daily deficit.";
    return plan;
  }

  el("deficitValue").textContent = formatCalories(plan.deficit);
  el("deficitScore").textContent = formatCalories(plan.deficit).replace(" kcal", "");

  if (plan.deficit >= targets.deficitLow && plan.deficit <= targets.deficitHigh) {
    pill.textContent = "On pace";
    pill.classList.remove("muted");
    el("deficitInsight").textContent = "This is within the rough 500-1000 kcal/day range for about 1-2 lb/week.";
  } else if (plan.deficit > targets.deficitHigh) {
    pill.textContent = "Aggressive";
    pill.classList.add("muted");
    el("deficitInsight").textContent = "This is above the rough 1-2 lb/week deficit range. Avoid making the plan feel punitive.";
  } else if (plan.deficit > 0) {
    pill.textContent = "Light";
    pill.classList.add("muted");
    el("deficitInsight").textContent = "This is a smaller deficit than the rough 1-2 lb/week target range.";
  } else {
    pill.textContent = "Surplus";
    pill.classList.add("muted");
    el("deficitInsight").textContent = "This estimates a calorie surplus today. Treat it as data, not a moral score.";
  }

  return plan;
}

function updateMovement() {
  const type = el("exerciseType").value;
  const minutes = Number(el("exerciseMinutes").value || 0);
  const intensity = el("exerciseIntensity").value.toLowerCase();
  const distance = el("exerciseDistance").value.trim();
  const summary = `${minutes} min ${intensity} ${type.toLowerCase()}${distance ? `, ${distance}` : ""}`;
  el("movementSummary").textContent = summary;
  el("movementScore").textContent = `${minutes}m`;
  el("movementPill").textContent = type === "Bike" ? "Bike day" : "Workout day";
  el("movementInsight").textContent =
    minutes >= targets.movementMinutes
      ? "Enough to reinforce the habit. Add 5 minutes of mobility before bed."
      : "A short session still counts. Consider a 10-minute walk to round it out.";
}

function updateSlackPreview() {
  const evening = el("eveningPrompt").value || "21:15";
  const [hours, minutes] = evening.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const enabled = el("slackEnabled").checked;
  el("slackPreview").textContent = enabled
    ? `${time}: What did you eat, how did you move, and what time are you aiming to sleep?`
    : "Slack prompts are paused. The site can still keep local entries.";
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function getHistory() {
  return readStorage(storageKeys.history, [])
    .filter((entry) => entry && entry.date)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function writeHistory(history) {
  localStorage.setItem(storageKeys.history, JSON.stringify(history));
}

function upsertHistoryEntry(entry) {
  const history = getHistory().filter((item) => item.date !== entry.date);
  history.push(entry);
  history.sort((a, b) => a.date.localeCompare(b.date));
  writeHistory(history);
}

function latestNumber(entries, key) {
  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const value = entries[index][key];
    if (Number.isFinite(value)) return value;
  }
  return null;
}

function firstNumber(entries, key) {
  const found = entries.find((entry) => Number.isFinite(entry[key]));
  return found ? found[key] : null;
}

function latestValue(entries, key) {
  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const value = entries[index][key];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return null;
}

function collectCurrentDay() {
  const nutrition = estimateNutrition(el("foodEntry").value).totals;
  const caloriePlan = getCaloriePlan(nutrition);
  return {
    date: el("logDate").value || todayISO(),
    quickEntry: el("quickEntry").value,
    foodEntry: el("foodEntry").value,
    bedtime: el("bedtime").value,
    waketime: el("waketime").value,
    wakeups: Number(el("wakeups").value || 0),
    sleepNote: el("sleepNote").value,
    sleepMinutes: getSleepMinutes(),
    nutrition,
    caloriePlan,
    exerciseType: el("exerciseType").value,
    exerciseMinutes: Number(el("exerciseMinutes").value || 0),
    exerciseDistance: el("exerciseDistance").value,
    exerciseIntensity: el("exerciseIntensity").value,
    weight: numberOrNull(el("currentWeight").value),
    startWeight: numberOrNull(el("startWeight").value),
    goalLoss: Number(el("goalLoss").value || 25),
    sex: el("sex").value,
    ageYears: Number(el("ageYears").value || 0),
    ageMonths: Number(el("ageMonths").value || 0),
    heightFeet: Number(el("heightFeet").value || 0),
    heightInches: Number(el("heightInches").value || 0),
    baselineBurn: caloriePlan.baselineBurn,
    weeklyLossGoal: caloriePlan.weeklyLossGoal,
    morningPrompt: el("morningPrompt").value,
    eveningPrompt: el("eveningPrompt").value,
    slackEnabled: el("slackEnabled").checked
  };
}

function hasSleepLog(entry) {
  return Number.isFinite(entry.sleepMinutes) && entry.sleepMinutes > 0;
}

function hasFoodLog(entry) {
  return Boolean(String(entry.foodEntry || "").trim());
}

function hasMovementLog(entry) {
  return Number.isFinite(entry.exerciseMinutes) && entry.exerciseMinutes > 0;
}

function hasWeightLog(entry) {
  return Number.isFinite(entry.weight) && entry.weight > 0;
}

function hasEntrySignal(entry) {
  return Boolean(
    hasWeightLog(entry) ||
      hasFoodLog(entry) ||
      hasMovementLog(entry) ||
      hasSleepLog(entry) ||
      String(entry.quickEntry || "").trim() ||
      String(entry.sleepNote || "").trim()
  );
}

function getCompletionStatus(entry) {
  const status = {
    sleep: hasSleepLog(entry),
    food: hasFoodLog(entry),
    movement: hasMovementLog(entry)
  };
  status.complete = status.sleep && status.food && status.movement;
  return status;
}

function completionQuoteForDate(date) {
  const index =
    String(date)
      .split("")
      .reduce((sum, character) => sum + character.charCodeAt(0), 0) % completionQuotes.length;
  return completionQuotes[index];
}

function entriesWithDraft() {
  const history = getHistory();
  const draft = collectCurrentDay();
  if (!hasEntrySignal(draft)) return history;
  return [...history.filter((entry) => entry.date !== draft.date), draft].sort((a, b) => a.date.localeCompare(b.date));
}

function getDateRange(endDate, days) {
  return Array.from({ length: days }, (_, index) => addDays(endDate, index - days + 1));
}

function entriesForRange(entries, endDate, days) {
  const dates = getDateRange(endDate, days);
  const byDate = new Map(entries.map((entry) => [entry.date, entry]));
  return dates.map((date) => byDate.get(date) || { date });
}

function average(values) {
  const clean = values.filter((value) => Number.isFinite(value));
  if (!clean.length) return null;
  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}

function dailyScore(entry) {
  if (!entry.sleepMinutes && !entry.nutrition && !entry.exerciseMinutes) return 0;
  const sleepScore = Math.min((entry.sleepMinutes || 0) / targets.sleepMinutes, 1);
  const fiberScore = Math.min(((entry.nutrition && entry.nutrition.fiber) || 0) / targets.fiber, 1);
  const movementScore = Math.min((entry.exerciseMinutes || 0) / targets.movementMinutes, 1);
  return Math.round(((sleepScore + fiberScore + movementScore) / 3) * 100);
}

function calculateStreak(entries, referenceDate = todayISO()) {
  const loggedDates = new Set(entries.filter(hasEntrySignal).map((entry) => entry.date));
  let cursor = loggedDates.has(referenceDate) ? referenceDate : addDays(referenceDate, -1);
  let count = 0;

  while (loggedDates.has(cursor)) {
    count += 1;
    cursor = addDays(cursor, -1);
  }

  return {
    count,
    loggedToday: loggedDates.has(referenceDate),
    loggedLast7: getDateRange(referenceDate, 7).filter((date) => loggedDates.has(date)).length
  };
}

function renderStartLine() {
  const selectedDate = el("logDate").value || programStartDate;
  const dayNumber = Math.max(1, daysBetween(programStartDate, selectedDate) + 1);
  el("startLine").textContent = `Start date ${dateLabel(programStartDate, {
    month: "long",
    day: "numeric",
    year: "numeric"
  })} · Day ${dayNumber}`;
}

function renderCompletion() {
  const entry = collectCurrentDay();
  const status = getCompletionStatus(entry);
  const quote = completionQuoteForDate(entry.date);
  const panel = el("completionPanel");

  panel.classList.toggle("is-complete", status.complete);
  el("completionEyebrow").textContent = status.complete ? "Full day logged" : "Today's checkpoint";
  el("completionTitle").textContent = status.complete ? "That is a complete day." : "Complete the three daily basics.";
  el("completionQuote").textContent = status.complete
    ? `"${quote.text}"`
    : "Log sleep, food, and movement to unlock today's encouraging quote. Weight can stay weekly.";

  [
    ["checkSleep", status.sleep],
    ["checkFood", status.food],
    ["checkMovement", status.movement]
  ].forEach(([id, isDone]) => el(id).classList.toggle("is-done", isDone));
}

function renderStreaks() {
  const referenceDate = el("logDate").value || programStartDate;
  const streak = calculateStreak(getHistory(), referenceDate);
  const dayLabel = streak.count === 1 ? "day" : "days";
  el("streakScore").textContent = `${streak.count}d`;
  el("streakScoreSub").textContent = streak.loggedToday ? "logged today" : "save this day";
  el("sideStreakValue").textContent = `${streak.count} ${dayLabel}`;

  if (!streak.count) {
    el("sideStreakCopy").textContent = "Save any one habit today to start the line.";
  } else if (streak.loggedToday) {
    el("sideStreakCopy").textContent = `${streak.loggedLast7} of the last 7 days have at least one entry.`;
  } else {
    el("sideStreakCopy").textContent = "Save any one habit today to keep the line moving.";
  }
}

function resolveWeightSettings(entries, draft) {
  const weightedEntries = entries.filter((entry) => Number.isFinite(entry.weight));
  const goalLoss = draft.goalLoss || latestNumber(entries, "goalLoss") || 25;
  const startWeight = draft.startWeight || firstNumber(entries, "startWeight") || firstNumber(weightedEntries, "weight") || draft.weight;
  const currentWeight = draft.weight || latestNumber(weightedEntries, "weight");
  return { goalLoss, startWeight, currentWeight, weightedEntries };
}

function renderBmiSummary(currentWeight, startWeight, goalLoss) {
  const profile = getProfile();
  const bmi = calculateBmi(currentWeight, profile.heightTotalInches);
  const category = getBmiCategory(bmi);
  const targetWeight = startWeight && goalLoss ? startWeight - goalLoss : null;
  const targetBmi = calculateBmi(targetWeight, profile.heightTotalInches);

  el("bmiScore").textContent = formatBmi(bmi);
  el("bmiScoreSub").textContent = category.label.toLowerCase();
  el("bmiValue").textContent = formatBmi(bmi);
  el("bmiCategory").textContent = category.label;
  el("bmiMarker").style.left = `${markerPositionForBmi(bmi)}%`;

  if (!Number.isFinite(bmi)) {
    el("bmiCopy").textContent = "Add your height and weekly weight to calculate BMI.";
  } else {
    el("bmiCopy").textContent = `At ${formatHeight(profile)}, ${formatWeight(currentWeight)}, and ${formatAge(profile)}, BMI is ${formatBmi(bmi)}. ${category.copy}`;
  }

  el("targetBmiCopy").textContent =
    Number.isFinite(targetBmi) && Number.isFinite(targetWeight)
      ? `Goal-weight BMI: ${formatBmi(targetBmi)} at ${formatWeight(targetWeight)}.`
      : "Goal-weight BMI appears once starting weight and goal loss are set.";
}

function renderWeightProgress(entries, sevenDayEntries) {
  const draft = collectCurrentDay();
  const { goalLoss, startWeight, currentWeight, weightedEntries } = resolveWeightSettings(entries, draft);
  const pill = el("weightPill");
  const sevenDayWeightAvg = average(sevenDayEntries.map((entry) => entry.weight));

  renderBmiSummary(currentWeight, startWeight, goalLoss);
  el("weightAverage").textContent = sevenDayWeightAvg ? formatWeight(sevenDayWeightAvg) : "--";
  el("weightScore").textContent = currentWeight ? formatWeight(currentWeight) : "--";
  el("weightScoreSub").textContent = `weekly, goal -${formatNumber(goalLoss, " lb", 1)}`;

  if (!startWeight || !currentWeight) {
    pill.textContent = "Set baseline";
    pill.classList.add("muted");
    el("goalProgressLabel").textContent = "Add a weight to start tracking.";
    el("goalProgressPercent").textContent = "0%";
    el("goalProgressBar").style.width = "0%";
    el("poundsLost").textContent = "--";
    el("poundsRemaining").textContent = formatWeight(goalLoss);
    el("targetWeight").textContent = startWeight ? formatWeight(startWeight - goalLoss) : "--";
    el("weightTrend").textContent = "--";
    return;
  }

  const targetWeight = startWeight - goalLoss;
  const lost = startWeight - currentWeight;
  const remaining = Math.max(goalLoss - lost, 0);
  const progress = Math.max(0, Math.min(100, Math.round((lost / goalLoss) * 100)));
  pill.textContent = progress >= 100 ? "Goal hit" : `${formatNumber(remaining, " lb", 1)} left`;
  pill.classList.toggle("muted", progress < 10);

  el("goalProgressLabel").textContent = `${formatWeight(currentWeight)} today, aiming for ${formatWeight(targetWeight)}.`;
  el("goalProgressPercent").textContent = `${progress}%`;
  el("goalProgressBar").style.width = `${progress}%`;
  el("poundsLost").textContent = formatNumber(Math.max(lost, 0), " lb", 1);
  el("poundsRemaining").textContent = formatNumber(remaining, " lb", 1);
  el("targetWeight").textContent = formatWeight(targetWeight);

  if (weightedEntries.length >= 2) {
    const first = weightedEntries[0].weight;
    const last = weightedEntries[weightedEntries.length - 1].weight;
    const delta = first - last;
    el("weightTrend").textContent =
      Math.abs(delta) < 0.1 ? "flat" : `${delta > 0 ? "down" : "up"} ${formatNumber(Math.abs(delta), " lb", 1)}`;
  } else {
    el("weightTrend").textContent = "1 weigh-in";
  }
}

function renderTrends() {
  const endDate = el("logDate").value || todayISO();
  const entries = entriesWithDraft();
  const sevenDayEntries = entriesForRange(entries, endDate, 7);
  const rangeDays = trendState.view === "weekly" ? 7 : 30;
  const rangeEntries = entriesForRange(entries, endDate, rangeDays);
  const savedRangeEntries = rangeEntries.filter(hasEntrySignal);

  const avgSleep = average(sevenDayEntries.map((entry) => entry.sleepMinutes));
  const avgCalories = average(sevenDayEntries.map((entry) => entry.nutrition && entry.nutrition.calories));
  const avgDeficit = average(sevenDayEntries.map((entry) => entry.caloriePlan && entry.caloriePlan.deficit));
  const avgFiber = average(sevenDayEntries.map((entry) => entry.nutrition && entry.nutrition.fiber));
  const avgMovement = average(sevenDayEntries.map((entry) => entry.exerciseMinutes));

  el("avgSleep7").textContent = avgSleep ? formatDuration(avgSleep) : "--";
  el("avgCalories7").textContent = avgCalories !== null ? formatCalories(avgCalories).replace(" kcal", "") : "--";
  el("avgDeficit7").textContent = avgDeficit !== null ? formatCalories(avgDeficit).replace(" kcal", "") : "--";
  el("avgFiber7").textContent = avgFiber !== null ? `${Math.round(avgFiber)}g` : "--";
  el("avgMovement7").textContent = avgMovement !== null ? `${Math.round(avgMovement)}m` : "--";

  renderWeightProgress(entries, sevenDayEntries);

  el("trendChart").innerHTML = rangeEntries
    .map((entry, index) => {
      const score = dailyScore(entry);
      const label =
        trendState.view === "weekly"
          ? dateLabel(entry.date, { weekday: "short" })
          : index % 6 === 0 || index === rangeEntries.length - 1
            ? dateLabel(entry.date, { month: "numeric", day: "numeric" })
            : "";
      const height = score ? Math.max(10, score) : 6;
      return `<div class="trend-bar ${score ? "" : "is-empty"}" style="height:${height}%">${label ? `<span>${label}</span>` : ""}</div>`;
    })
    .join("");

  if (!savedRangeEntries.length) {
    el("trendList").innerHTML =
      '<p class="empty-trend">Save a few days and this turns into a history view with weekly and monthly comparisons.</p>';
    return;
  }

  el("trendList").innerHTML = savedRangeEntries
    .slice(-6)
    .reverse()
    .map((entry) => {
      const fiber = entry.nutrition && Number.isFinite(entry.nutrition.fiber) ? `${entry.nutrition.fiber}g fiber` : "fiber --";
      const calories = entry.nutrition && Number.isFinite(entry.nutrition.calories) ? `${entry.nutrition.calories} cal` : "cal --";
      const deficit =
        entry.caloriePlan && Number.isFinite(entry.caloriePlan.deficit)
          ? `${Math.round(entry.caloriePlan.deficit)} def`
          : "def --";
      const movement = Number.isFinite(entry.exerciseMinutes) ? `${entry.exerciseMinutes}m move` : "move --";
      const sleep = entry.sleepMinutes ? formatDuration(entry.sleepMinutes) : "sleep --";
      const weight = entry.weight ? formatWeight(entry.weight) : "weight --";
      return `
        <div class="trend-row">
          <strong>${dateLabel(entry.date)}</strong>
          <span>${sleep}</span>
          <span>${calories}</span>
          <span>${deficit}</span>
          <span>${fiber}</span>
          <span>${movement}</span>
          <span>${weight}</span>
        </div>
      `;
    })
    .join("");
}

function showToast(message) {
  const toast = el("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function saveDay() {
  const payload = collectCurrentDay();
  const priorHistory = getHistory();
  if (!payload.startWeight && payload.weight && !firstNumber(priorHistory, "startWeight") && !firstNumber(priorHistory, "weight")) {
    payload.startWeight = payload.weight;
    el("startWeight").value = payload.weight;
  }
  if (getCompletionStatus(payload).complete) {
    payload.completionQuote = completionQuoteForDate(payload.date);
  }
  localStorage.setItem(storageKeys.today, JSON.stringify(payload));
  upsertHistoryEntry(payload);
  refreshAll();
  if (payload.completionQuote) {
    showToast(`Full day logged. ${payload.completionQuote.text}`);
  } else {
    showToast(`Saved ${dateLabel(payload.date)} to your progress history.`);
  }
}

function applyEntry(entry) {
  if (!entry) return;
  const fields = [
    "quickEntry",
    "foodEntry",
    "bedtime",
    "waketime",
    "sleepNote",
    "exerciseType",
    "exerciseDistance",
    "exerciseIntensity",
    "sex",
    "ageYears",
    "ageMonths",
    "heightFeet",
    "heightInches",
    "baselineBurn",
    "weeklyLossGoal",
    "morningPrompt",
    "eveningPrompt"
  ];
  fields.forEach((key) => {
    if (entry[key] !== undefined && el(key)) el(key).value = entry[key];
  });

  if (entry.date) el("logDate").value = entry.date;
  if (entry.wakeups !== undefined) el("wakeups").value = entry.wakeups;
  if (entry.exerciseMinutes !== undefined) el("exerciseMinutes").value = entry.exerciseMinutes;
  if (entry.weight !== undefined && entry.weight !== null) el("currentWeight").value = entry.weight;
  if (entry.startWeight !== undefined && entry.startWeight !== null) el("startWeight").value = entry.startWeight;
  if (entry.goalLoss !== undefined) el("goalLoss").value = entry.goalLoss;
  if (entry.baselineBurn !== undefined) el("baselineBurn").value = entry.baselineBurn;
  if (entry.weeklyLossGoal !== undefined) el("weeklyLossGoal").value = entry.weeklyLossGoal;
  if (entry.slackEnabled !== undefined) el("slackEnabled").checked = Boolean(entry.slackEnabled);
}

function carryForwardWeightSettings() {
  const history = getHistory();
  const baseline = firstNumber(history, "startWeight") || firstNumber(history.filter((entry) => Number.isFinite(entry.weight)), "weight");
  const goal = latestNumber(history, "goalLoss");
  if (baseline && !el("startWeight").value) el("startWeight").value = baseline;
  if (goal && !el("goalLoss").value) el("goalLoss").value = goal;
}

function carryForwardCalorieSettings(force = false) {
  const history = getHistory();
  const burn = latestNumber(history, "baselineBurn");
  const pace = latestNumber(history, "weeklyLossGoal");
  if (burn && (force || !el("baselineBurn").value)) el("baselineBurn").value = burn;
  if (pace && (force || !el("weeklyLossGoal").value)) el("weeklyLossGoal").value = pace;
}

function carryForwardProfileSettings(force = false) {
  const history = getHistory();
  ["sex", "ageYears", "ageMonths", "heightFeet", "heightInches"].forEach((key) => {
    const value = latestValue(history, key);
    if (value !== null && (force || !el(key).value)) el(key).value = value;
  });
}

function defaultLogDate() {
  const currentDate = todayISO();
  const draft = readStorage(storageKeys.today, null);
  if (draft && draft.date === currentDate) return currentDate;
  return currentDate < programStartDate ? programStartDate : currentDate;
}

function loadDay() {
  const currentDate = defaultLogDate();
  el("logDate").value = currentDate;
  const draft = readStorage(storageKeys.today, null);
  const todayEntry = getHistory().find((entry) => entry.date === currentDate);
  const hasCurrentEntry = Boolean((draft && draft.date === currentDate) || todayEntry);
  if (draft && draft.date === currentDate) applyEntry(draft);
  else if (todayEntry) applyEntry(todayEntry);
  carryForwardWeightSettings();
  carryForwardProfileSettings(!hasCurrentEntry);
  carryForwardCalorieSettings(!hasCurrentEntry);
}

function resetEntryFields(keepDate = true) {
  const date = el("logDate").value;
  el("quickEntry").value = "";
  el("foodEntry").value = "";
  el("sleepNote").value = "";
  el("bedtime").value = "23:00";
  el("waketime").value = "06:30";
  el("wakeups").value = "0";
  el("exerciseType").value = "Bike";
  el("exerciseMinutes").value = "0";
  el("exerciseDistance").value = "";
  el("exerciseIntensity").value = "Easy";
  el("currentWeight").value = "";
  el("baselineBurn").value = "2100";
  el("weeklyLossGoal").value = "1.5";
  if (keepDate) el("logDate").value = date;
}

function clearDay() {
  localStorage.removeItem(storageKeys.today);
  resetEntryFields(true);
  refreshAll();
  showToast("Cleared the current draft. Saved history is still intact.");
}

function loadSelectedDate() {
  const selectedDate = el("logDate").value;
  const entry = getHistory().find((item) => item.date === selectedDate);
  resetEntryFields(true);
  if (entry) {
    applyEntry(entry);
    showToast(`Loaded ${dateLabel(selectedDate)}.`);
  }
  carryForwardWeightSettings();
  carryForwardProfileSettings();
  carryForwardCalorieSettings();
  refreshAll();
}

function parseQuickEntry() {
  const text = el("quickEntry").value.trim();
  if (!text) {
    showToast("Add an update first.");
    return;
  }

  const lower = text.toLowerCase();
  const sleepMatch = lower.match(/(?:sleep|slept|bed|bedtime).*?(\d{1,2}(?::\d{2})?)\s*(am|pm)?\s*(?:to|-|until)\s*(\d{1,2}(?::\d{2})?)\s*(am|pm)?/);
  if (sleepMatch) {
    el("bedtime").value = toTimeInput(sleepMatch[1], sleepMatch[2] || "pm");
    el("waketime").value = toTimeInput(sleepMatch[3], sleepMatch[4] || "am");
  }

  if (lower.includes("woke once")) el("wakeups").value = "1";
  else if (lower.includes("woke twice")) el("wakeups").value = "2";
  else {
    const wakeMatch = lower.match(/woke\s+(\d+)/);
    if (wakeMatch) el("wakeups").value = wakeMatch[1];
  }

  const weightMatch = lower.match(/(?:weight|weigh|weighed)\s*(?:was|is|in at)?\s*(\d{2,3}(?:\.\d+)?)/);
  if (weightMatch) el("currentWeight").value = weightMatch[1];

  const heightMatch = lower.match(/(?:height|i am|i'm)\s*(?:is|am)?\s*(\d)\s*(?:'|ft|feet|foot)\s*(\d{1,2})?/);
  if (heightMatch) {
    el("heightFeet").value = heightMatch[1];
    if (heightMatch[2]) el("heightInches").value = heightMatch[2];
  }

  const ageMatch = lower.match(/(?:age|aged|i am|i'm)\s*(\d{2})\s*(?:years|yrs|year|yr)?(?:\s*(\d{1,2})\s*(?:months|month|mos|mo))?/);
  if (ageMatch) {
    el("ageYears").value = ageMatch[1];
    if (ageMatch[2]) el("ageMonths").value = ageMatch[2];
  }

  if (lower.includes("female")) el("sex").value = "female";
  else if (lower.includes("male")) el("sex").value = "male";

  const exerciseMatch = lower.match(/(bike|workout|strength|walk|yoga).*?(\d+)\s*(?:min|minute|minutes)/);
  if (exerciseMatch) {
    const typeMap = { bike: "Bike", workout: "Other workout", strength: "Strength", walk: "Walk", yoga: "Yoga" };
    el("exerciseType").value = typeMap[exerciseMatch[1]];
    el("exerciseMinutes").value = exerciseMatch[2];
    if (lower.includes("hard")) el("exerciseIntensity").value = "Hard";
    else if (lower.includes("moderate")) el("exerciseIntensity").value = "Moderate";
    else el("exerciseIntensity").value = "Easy";
  }

  const foodWords = foodDb.flatMap((food) => food.keys);
  if (foodWords.some((word) => lower.includes(word)) || lower.includes("breakfast") || lower.includes("lunch") || lower.includes("dinner")) {
    el("foodEntry").value = text;
  }

  refreshAll();
  showToast("Parsed the update into today's cards.");
}

function toTimeInput(raw, ampm) {
  const [hourRaw, minuteRaw = "00"] = raw.split(":");
  let hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  const marker = ampm.toLowerCase();
  if (marker === "pm" && hour < 12) hour += 12;
  if (marker === "am" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function rotateSpark() {
  const index = Math.floor(Math.random() * quotes.length);
  el("dailyQuote").textContent = `"${quotes[index].text}"`;
  document.querySelector(".quote-source").textContent = quotes[index].source;

  const read = reads[index % reads.length];
  el("readTitle").textContent = read.title;
  el("readText").textContent = read.text;
}

function swapChallenge() {
  const current = el("challengeText").textContent.trim();
  const options = challenges.filter((item) => item !== current);
  el("challengeText").textContent = options[Math.floor(Math.random() * options.length)];
}

function setupVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const button = el("voiceButton");
  const status = el("voiceStatus");

  if (!SpeechRecognition) {
    button.disabled = true;
    button.textContent = "Voice unavailable";
    status.textContent = "Voice capture is not supported in this browser. Typing still works.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  button.addEventListener("click", () => {
    recognition.start();
    status.textContent = "Listening...";
  });

  recognition.addEventListener("result", (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join(" ");
    el("quickEntry").value = transcript;
    status.textContent = "Voice captured. Review it, then parse.";
  });

  recognition.addEventListener("error", () => {
    status.textContent = "Voice capture stopped. You can type the update instead.";
  });
}

function refreshAll() {
  renderStartLine();
  calculateSleep();
  updateNutrition();
  updateMovement();
  updateSlackPreview();
  renderTrends();
  renderCompletion();
  renderStreaks();
}

["bedtime", "waketime", "wakeups"].forEach((id) => el(id).addEventListener("input", refreshAll));
["exerciseType", "exerciseMinutes", "exerciseDistance", "exerciseIntensity"].forEach((id) =>
  el(id).addEventListener("input", refreshAll)
);
["morningPrompt", "eveningPrompt", "slackEnabled"].forEach((id) => el(id).addEventListener("input", updateSlackPreview));
["currentWeight", "startWeight", "goalLoss"].forEach((id) => el(id).addEventListener("input", renderTrends));
["sex", "ageYears", "ageMonths", "heightFeet", "heightInches"].forEach((id) => el(id).addEventListener("input", renderTrends));
["baselineBurn", "weeklyLossGoal"].forEach((id) => el(id).addEventListener("input", refreshAll));

document.querySelectorAll(".segmented-control button").forEach((button) => {
  button.addEventListener("click", () => {
    trendState.view = button.dataset.view;
    document.querySelectorAll(".segmented-control button").forEach((item) => item.classList.toggle("is-active", item === button));
    renderTrends();
  });
});

el("logDate").addEventListener("change", loadSelectedDate);
el("estimateFoodButton").addEventListener("click", () => {
  updateNutrition();
  renderTrends();
  showToast("Updated rough nutrition estimate.");
});
el("foodEntry").addEventListener("input", refreshAll);
el("parseButton").addEventListener("click", parseQuickEntry);
el("saveDayButton").addEventListener("click", saveDay);
el("clearDayButton").addEventListener("click", clearDay);
el("newSparkButton").addEventListener("click", rotateSpark);
el("swapChallengeButton").addEventListener("click", swapChallenge);

loadDay();
setupVoice();
refreshAll();
