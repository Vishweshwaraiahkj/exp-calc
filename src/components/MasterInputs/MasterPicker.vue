<style lang="scss">
.calendar-box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
}

.calendar {
  position: absolute;
  top: 100%;
  width: 100%;
  height: auto;
  background-color: var(--orange);
  color: var(--light);
  box-shadow: boxShadow(dark);

  .visible-month {
    width: 100%;
    height: 20%;
    background-color: var(--purple);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    text-align: center;
    text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);

    h1 {
      font-size: 1rem;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
    }

    .svg-holder {
      cursor: pointer;

      &:focus {
        @include hoverTransform(0.8);
      }
    }
  }

  .weekdays,
  .visible-days {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 0.2rem;

    div {
      display: grid;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      font-weight: 400;
      letter-spacing: 0.1rem;
      text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
      transition: background-color 0.2s;
      margin: px2rem(1);
      padding: px2rem(5) 0;
    }
  }

  .weekdays {
    height: 10%;
  }

  .visible-days {
    height: 70%;

    div {
      &.month-date:hover,
      &.current-date:hover,
      &.selected-date:hover {
        background-color: var(--secondary);
        cursor: pointer;
      }
    }
  }

  .prev-date,
  .next-date {
    opacity: 0.5;
  }

  .current-date {
    background-color: var(--secondary);
  }

  .selected-date {
    background-color: var(--primary);
  }

  .picker-container {
    height: 70%;
    flex-direction: column;

    span,
    div {
      flex: 1;
      width: 100%;
    }

    .selected-time {
      display: flex;
      background-color: var(--dark);
      color: var(--white);
      cursor: pointer;

      span {
        height: px2rem(40);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
      }
    }

    .time-picker {
      display: flex;

      span input {
        background-color: var(--orange);
      }

      .drop-box {
        height: 15rem;
        overflow: auto;
        background-color: var(--orange);
        flex: 1;

        @include hideScroll();
      }

      .hours-list,
      .minutes-list,
      .am-pm,
      .toggler,
      .update-data {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        height: px2rem(40);
        width: 100%;
        margin: px2rem(1);
        text-align: center;
        align-items: center;
        text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);

        &:hover {
          background-color: var(--gray);
        }
      }

      label {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        cursor: pointer;
        color: var(--light);

        &.is-selected {
          background-color: var(--dark);
          color: var(--white);
        }
      }
    }
  }
}
</style>
<template lang="html">
  <div class="calendar-box">
    <MasterInput
      :inputLabel="inputLabel"
      :inputPlaceholder="inputPlaceholder"
      :inputWidth="inputWidth"
      :inputRequired="true"
      inputId="datePicker"
      inputName="date-picker"
      inputType="text"
      v-model:input-value="selectedDate"
      @click="toggleCalendar()"
      @onInputClear="onInputClear"
    />
    <div v-if="isVisible" class="calendar">
      <div class="visible-month">
        <MasterIcon
          size="x-small"
          svg-name="previous"
          fillColor="white"
          @click="prevMonth"
          tabIndex="-1"
        />
        <div class="date">
          <h1>{{ selectedMonth }}</h1>
          <p>{{ stringDate }}</p>
        </div>
        <MasterIcon
          size="x-small"
          svg-name="next"
          fillColor="white"
          @click="nextMonth"
          tabIndex="-1"
        />
      </div>
      <div class="weekdays" v-if="showDates">
        <div v-for="day in dayStrings" :key="day">
          {{ day }}
        </div>
      </div>
      <div class="visible-days" v-if="showDates">
        <div
          v-for="i in visibleDays"
          :key="i.key"
          :class="i.class"
          @click.stop="selectDate(i)"
        >
          {{ i.date }}
        </div>
      </div>
      <div v-if="showTimer" class="picker-container input-group">
        <div class="selected-time">
          <span>{{ padZero(selectedTime.hrs) }}</span>
          <span>{{ padZero(selectedTime.mins) }}</span>
          <span>{{ selectedTime.type }}</span>
        </div>
        <div class="time-picker">
          <div class="drop-box">
            <span
              class="hours-list"
              v-for="i in 12"
              :key="i"
              @click.stop="selectHours(i)"
            >
              <label
                v-if="selectedTime.hrs === i"
                class="is-selected"
                id="selected_hr"
              >
                {{ padZero(i) }}
              </label>
              <label v-else class="un-selected">
                {{ padZero(i) }}
              </label>
            </span>
          </div>
          <div class="drop-box">
            <span
              class="minutes-list"
              v-for="i in 60"
              :key="i"
              @click.stop="selectMinutes(i - 1)"
            >
              <label
                v-if="selectedTime.mins === i - 1"
                class="is-selected"
                id="selected_mn"
              >
                {{ padZero(i - 1) }}
              </label>
              <label v-else class="un-selected">
                {{ padZero(i - 1) }}
              </label>
            </span>
          </div>
          <div class="drop-box">
            <span class="am-pm" @click="selectType('AM')">
              <label :class="`${selectedTime.type === 'AM' && 'is-selected'}`">
                AM
              </label>
            </span>
            <span class="am-pm" @click="selectType('PM')">
              <label :class="`${selectedTime.type === 'PM' && 'is-selected'}`">
                PM
              </label>
            </span>
            <span class="toggler" @click="showCalendar()">
              <label class="toggle-cal">
                <MasterIcon svgName="calendar" fillColor="#fff" size="small" />
              </label>
            </span>
            <span class="update-data" @click="updateInputStr()">
              <label class="update-date-time">
                <MasterIcon svgName="check-square" fillColor="#fff" size="28" />
              </label>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import MasterIcon from '@/components/MasterUtils/MasterIcon.vue'
import MasterInput from '@/components/MasterInputs/MasterInput.vue'
import { monthStrings, dayStrings } from '@/constants/DateTime'

const emits = defineEmits(['emitDateTime'])

const props = defineProps({
  inputLabel: {
    default: 'Date',
    type: String
  },
  inputDate: {
    type: [String, Date],
    default: null
  },
  inputPlaceholder: {
    default: 'dd-mmm-yyyy hh:mm a',
    type: String
  },
  inputWidth: {
    default: '100%',
    type: String
  }
})

const dateRef = ref(new Date())
const selectedDate = ref()
const selectedMonth = ref()
const selectedYear = ref()
const stringDate = ref()
const defaultSel = ref()
const dateObj = ref({})

const visibleDays = ref([])

const isVisible = ref(false)
const showDates = ref(true)
const showTimer = ref(false)

const selectedTime = ref({
  hrs:
    dateRef.value.getHours() > 12
      ? dateRef.value.getHours() - 12
      : dateRef.value.getHours() || 12,
  mins: dateRef.value.getMinutes(),
  type: dateRef.value.getHours() >= 12 ? 'PM' : 'AM'
})

const padZero = (i) => {
  return ('0' + i).slice(-2)
}

const getDayShortStr = (date) => {
  return new Date(date).toLocaleString('default', { weekday: 'short' })
}

const getCustomMonth = (dateRefStr, type) => {
  if (!dateRefStr) return monthStrings[0]
  let monthNum = new Date(dateRefStr).getMonth() + 1
  if (type === 'next') {
    monthNum = new Date(dateRefStr).getMonth() + 2
  } else if (type === 'previous') {
    monthNum = new Date(dateRefStr).getMonth()
  }
  if (monthNum > 12) {
    monthNum = 1
  } else if (monthNum < 1) {
    monthNum = 12
  }
  const monthObject = monthStrings.find((i) => i.id === monthNum)
  return monthObject
}

const processCalendar = () => {
  visibleDays.value = []

  selectedMonth.value = getCustomMonth(dateRef.value, 'current').short

  stringDate.value = dateRef.value.toDateString()

  selectedYear.value = dateRef.value.getFullYear()

  dateRef.value.setDate(1)

  const lastDay = new Date(
    dateRef.value.getFullYear(),
    dateRef.value.getMonth() + 1,
    0
  ).getDate()

  const prevLastDay = new Date(
    dateRef.value.getFullYear(),
    dateRef.value.getMonth(),
    0
  ).getDate()

  const firstDayIndex = dateRef.value.getDay()

  const lastDayIndex = new Date(
    dateRef.value.getFullYear(),
    dateRef.value.getMonth() + 1,
    0
  ).getDay()

  const nextDays = 7 - lastDayIndex - 1

  for (let x = firstDayIndex; x > 0; x--) {
    visibleDays.value.push({
      class: 'prev-date',
      date: prevLastDay - x + 1,
      month: getCustomMonth(dateRef.value, 'previous').short,
      key: `prev-date-${prevLastDay - x + 1}`
    })
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === defaultSel.value.getDate() &&
      defaultSel.value.getMonth() === dateRef.value.getMonth() &&
      defaultSel.value.getFullYear() === dateRef.value.getFullYear()
    ) {
      visibleDays.value.push({
        class: 'selected-date',
        date: i,
        month: selectedMonth.value,
        key: `selected-date-${i}`,
        shortDay: getDayShortStr(
          `${i}-${selectedMonth.value}-${selectedYear.value}`
        ),
        fullDate: `${i}-${selectedMonth.value}-${selectedYear.value}`
      })
    } else if (
      i === new Date().getDate() &&
      dateRef.value.getMonth() === new Date().getMonth() &&
      dateRef.value.getFullYear() === new Date().getFullYear()
    ) {
      visibleDays.value.push({
        class: 'current-date',
        date: i,
        month: selectedMonth.value,
        key: `current-date-${i}`,
        shortDay: getDayShortStr(
          `${i}-${selectedMonth.value}-${selectedYear.value}`
        ),
        fullDate: `${i}-${selectedMonth.value}-${selectedYear.value}`
      })
    } else {
      visibleDays.value.push({
        class: 'month-date',
        date: i,
        month: selectedMonth.value,
        key: `month-date-${i}`,
        shortDay: getDayShortStr(
          `${i}-${selectedMonth.value}-${selectedYear.value}`
        ),
        fullDate: `${i}-${selectedMonth.value}-${selectedYear.value}`
      })
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    visibleDays.value.push({
      class: 'next-date',
      date: j,
      month: getCustomMonth(dateRef.value, 'next').short,
      key: `next-date-${j}`
    })
  }
}

const toggleCalendar = () => {
  showDates.value = true
  showTimer.value = false
  isVisible.value = !isVisible.value
}

const showCalendar = () => {
  showDates.value = true
  showTimer.value = false
}

const prevMonth = () => {
  const prevMonthNum = dateRef.value.getMonth() - 1
  dateRef.value.setMonth(prevMonthNum)
  processCalendar()
  showDates.value = true
  showTimer.value = false
}

const nextMonth = () => {
  const nextMonthNum = dateRef.value.getMonth() + 1
  dateRef.value.setMonth(nextMonthNum)
  processCalendar()
  showDates.value = true
  showTimer.value = false
}

onMounted(() => {
  if (props.inputDate) {
    selectedDate.value = props.inputDate
    dateRef.value = new Date(props.inputDate)
    defaultSel.value = new Date(props.inputDate)
  }
  processCalendar()
})

const onInputClear = () => {
  dateRef.value = new Date()
  emits('emitDateTime', '')
  processCalendar()
}

const selectHours = (hr) => {
  selectedTime.value.hrs = hr
}

const selectMinutes = (mn) => {
  selectedTime.value.mins = mn
}

const selectType = (type) => {
  selectedTime.value.type = type
}

const selectDate = (date) => {
  if (date.class === 'next-date' || date.class === 'prev-date') {
    return false
  }
  dateObj.value = date
  showDates.value = false
  showTimer.value = true
}

const updateInputStr = () => {
  const hrs = padZero(selectedTime.value.hrs)
  const mins = padZero(selectedTime.value.mins)
  const type = selectedTime.value.type
  const finalDateTime = `${dateObj.value?.fullDate} ${hrs}:${mins} ${type}`
  selectedDate.value = finalDateTime
  dateRef.value = new Date(finalDateTime)
  defaultSel.value = new Date(finalDateTime)
  emits('emitDateTime', finalDateTime)
  processCalendar()
  toggleCalendar()
}
</script>
