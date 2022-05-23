import fecha from 'fecha'

const defaultConfig = {}
const defaultI18n = 'EN'
const availableMonths = {
  EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
    'December'],
  TW: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
}

const availableShortDays = {
  EN: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  TW: ['日', '一', '二', '三', '四', '五', '六']
}

const presetRangeLabel = {
  EN: {
    today: 'Today',
    yesterday: 'Yestoday', // 昨天
    thisWeek: 'This  Week', // 本週
    lastWeek: 'Last Week', // 上週
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    thisYear: 'This Year', // 今年
    lastYear: 'Last Year', // 去年
    lastSevenSays: 'Last 7 Days',
    lastThirtyDays: 'Last 30 Days'
  },
  TW: {
    today: '今天',
    yesterday: '昨天', // 昨天
    thisWeek: '本週', // 本週
    lastWeek: '上週', // 上週
    thisMonth: '本月',
    lastMonth: '上月',
    thisYear: '今年', // 今年
    lastYear: '上一年', // 上一年
    lastSevenDays: '前7天',
    lastThirtyDays: '最近30天'
  }
}

const defaultCaptions = {
  'title': 'Choose Dates',
  'ok_button': 'Apply'
}

const defaultStyle = {
  daysWeeks: 'calendar_weeks',
  days: 'calendar_days',
  daysSelected: 'calendar_days_selected',
  daysInRange: 'calendar_days_in-range',
  firstDate: 'calendar_month_left',
  secondDate: 'cal本alendar_days--disabled'
}

const defaultPresets = function (i18n = defaultI18n) {
  return {
    today: function () {
      const n = new Date()
      const today = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0))
      return {
        label: presetRangeLabel[i18n].today,
        active: false,
        dateRange: {
          start: today,
          end: today
        }
      }
    },
    // 昨天
    yesterday: function () {
      const n = new Date()
      // getDate()若為1, getDate() - 1會自動跳到前一個月的最後一天
      const yesterday = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - 1))
      return {
        label: presetRangeLabel[i18n].yestoday,
        active: false,
        dateRange: {
          start: yesterday,
          end: yesterday
        }
      }
    },
    // 本週
    thisWeek: function () {
      const n = new Date()
      // 以今天的日期減掉getDay()星期幾,即為該週第1天(星期日)的日期
      const start = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - n.getDay()))
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - n.getDay() + 6))
      return {
        label: 'presetRangeLabel[i18n].yestoday',
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      }
    },
    // 上週
    lastWeek: function () {
      const n = new Date()
      const start = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - n.getDay() - 7))
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - n.getDay() + 6 - 7))
      return {
        label: 'presetRangeLabel[i18n].yestoday',
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      }
    },
    thisMonth: function () {
      const n = new Date()
      const startMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth(), 1))
      const endMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth() + 1, 0))
      return {
        label: presetRangeLabel[i18n].thisMonth,
        active: false,
        dateRange: {
          start: startMonth,
          end: endMonth
        }
      }
    },
    lastMonth: function () {
      const n = new Date()
      const startMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth() - 1, 1))
      const endMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth(), 0))
      return {
        label: presetRangeLabel[i18n].lastMonth,
        active: false,
        dateRange: {
          start: startMonth,
          end: endMonth
        }
      }
    },
    // 今年
    thisYear: function () {
      const n = new Date()
      const start = new Date(Date.UTC(n.getFullYear(), 0, 1))
      const end = new Date(Date.UTC(n.getFullYear(), 11, 31))
      return {
        label: presetRangeLabel[i18n].thisYear,
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      }
    },
    // 上一年
    lastYear: function () {
      const n = new Date()
      const start = new Date(Date.UTC(n.getFullYear() - 1, 0, 1))
      const end = new Date(Date.UTC(n.getFullYear() - 1, 11, 31))
      return {
        label: presetRangeLabel[i18n].thisYear,
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      }
    },
    last7days: function () {
      const n = new Date()
      const start = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - 6))
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()))
      return {
        label: presetRangeLabel[i18n].lastSevenDays,
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      }
    },
    last30days: function () {
      const n = new Date()
      const start = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - 30))
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()))
      return {
        label: presetRangeLabel[i18n].lastThirtyDays,
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      }
    }
  }
}

export default {
  name: 'vue-rangedate-picker',
  props: {
    configs: {
      type: Object,
      default: () => defaultConfig
    },
    i18n: {
      type: String,
      default: defaultI18n
    },
    months: {
      type: Array,
      default: () => null
    },
    shortDays: {
      type: Array,
      default: () => null
    },
    // options for captions are: title, ok_button
    captions: {
      type: Object,
      default: () => defaultCaptions
    },
    format: {
      type: String,
      default: 'DD MMM YYYY'
    },
    styles: {
      type: Object,
      default: () => {}
    },
    initRange: {
      type: Object,
      default: () => null
    },
    startActiveMonth: {
      type: Number,
      default: new Date().getMonth()
    },
    startActiveYear: {
      type: Number,
      default: new Date().getFullYear()
    },
    presetRanges: {
      type: Object,
      default: () => null
    },
    compact: {
      type: String,
      default: 'false'
    },
    righttoleft: {
      type: String,
      default: 'false'
    },
    disabled: {
      type: String,
      default: 'false' // 'false','true','disabled
    }
  },
  data () {
    return {
      dateRange: {},
      numOfDays: 7,
      isFirstChoice: true,
      isOpen: false,
      presetActive: '',
      showMonth: false,
      activeMonthStart: this.startActiveMonth,
      activeYearStart: this.startActiveYear,
      activeYearEnd: this.startActiveYear,
      disabledDiv: false
    }
  },
  created () {
    if (this.isCompact) {
      this.isOpen = true
    }
    if (this.activeMonthStart === 11) this.activeYearEnd = this.activeYearStart + 1
  },
  watch: {
    startNextActiveMonth: function (value) {
      if (value === 0) this.activeYearEnd = this.activeYearStart + 1
    }
  },
  computed: {
    monthsLocale: function () {
      return this.months || availableMonths[this.i18n]
    },
    shortDaysLocale: function () {
      return this.shortDays || availableShortDays[this.i18n]
    },
    s: function () {
      return Object.assign({}, defaultStyle, this.style)
    },
    startMonthDay: function () {
      return new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 1)).getDay()
    },
    startNextMonthDay: function () {
      return new Date(Date.UTC(this.activeYearStart, this.startNextActiveMonth, 1)).getDay()
    },
    endMonthDate: function () {
      return new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 0)).getDate()
    },
    endNextMonthDate: function () {
      return new Date(Date.UTC(this.activeYearEnd, this.activeMonthStart + 2, 0)).getDate()
    },
    startNextActiveMonth: function () {
      return this.activeMonthStart >= 11 ? 0 : this.activeMonthStart + 1
    },
    finalPresetRanges: function () {
      const tmp = {}
      const presets = this.presetRanges || defaultPresets(this.i18n)
      for (const i in presets) {
        const item = presets[i]
        let plainItem = item
        if (typeof item === 'function') {
          plainItem = item()
        }
        tmp[i] = plainItem
      }
      return tmp
    },
    isCompact: function () {
      return this.compact === 'true'
    },
    isRighttoLeft: function () {
      return this.righttoleft === 'true'
    }
  },
  methods: {
    reset () {
      this.isOpen = false
      this.showMonth = false
    },
    toggleCalendar: function () {
      // support check disabled from parent element with .vue class
      const parentEl = this.$el.closest('.vue')
      if (parentEl !== null) {
        const diabledVal = parentEl.getAttribute('disabled')
        if (diabledVal === 'true' || diabledVal === 'disabled') {
          this.disabledDiv = true
          return
        }
      }
      if (this.disabled === 'true' || this.disabled === 'disabled') {
        this.disabledDiv = true
        return
      }
      this.disabledDiv = false
      if (this.isCompact) {
        this.showMonth = !this.showMonth
        return
      }
      this.isOpen = !this.isOpen
      this.showMonth = !this.showMonth
      return
    },
    getDateString: function (date, format = this.format) {
      if (!date) {
        return null
      }
      const dateparse = new Date(Date.parse(date))
      return fecha.format(new Date(Date.UTC(dateparse.getFullYear(), dateparse.getMonth(), dateparse.getDate())), format)
    },
    getDayIndexInMonth: function (r, i, startMonthDay) {
      const date = (this.numOfDays * (r - 1)) + i
      return date - startMonthDay
    },
    getDayCell (r, i, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      // bound by > 0 and < last day of month
      return result > 0 && result <= endMonthDate ? result : '&nbsp;'
    },
    getNewDateRange (result, activeMonth, activeYear) {
      const newData = {}
      let key = 'start'
      if (!this.isFirstChoice) {
        key = 'end'
      } else {
        newData['end'] = null
      }
      const resultDate = new Date(Date.UTC(activeYear, activeMonth, result))
      if (!this.isFirstChoice && resultDate < this.dateRange.start) {
        this.isFirstChoice = false
        return { start: resultDate }
      }

      // toggle first choice
      this.isFirstChoice = !this.isFirstChoice
      newData[key] = resultDate
      return newData
    },
    selectFirstItem (r, i) {
      const result = this.getDayIndexInMonth(r, i, this.startMonthDay)
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.activeMonthStart,
      this.activeYearStart))
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = ''
        if (this.isCompact) {
          this.showMonth = false
        }
      }
    },
    selectSecondItem (r, i) {
      const result = this.getDayIndexInMonth(r, i, this.startNextMonthDay)
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.startNextActiveMonth,
      this.activeYearEnd))
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = ''
      }
    },
    isDateSelected (r, i, key, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      if (result < 1 || result > endMonthDate) return false

      let currDate = null
      if (key === 'first') {
        currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result))
      } else {
        currDate = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, result))
      }
      return (this.dateRange.start && this.dateRange.start.getTime() === currDate.getTime()) ||
        (this.dateRange.end && this.dateRange.end.getTime() === currDate.getTime())
    },
    isDateInRange (r, i, key, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      if (result < 2 || result > endMonthDate) return false

      let currDate = null
      if (key === 'first') {
        currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result))
      } else {
        currDate = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, result))
      }
      return (this.dateRange.start && this.dateRange.start.getTime() < currDate.getTime()) &&
        (this.dateRange.end && this.dateRange.end.getTime() > currDate.getTime())
    },
    isDateDisabled (r, i, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      // bound by > 0 and < last day of month
      return !(result > 0 && result <= endMonthDate)
    },
    goPrevMonth () {
      const prevMonth = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 0))
      this.activeMonthStart = prevMonth.getMonth()
      this.activeYearStart = prevMonth.getFullYear()
      this.activeYearEnd = prevMonth.getFullYear()
    },
    goNextMonth () {
      const nextMonth = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 1))
      this.activeMonthStart = nextMonth.getMonth()
      this.activeYearStart = nextMonth.getFullYear()
      this.activeYearEnd = nextMonth.getFullYear()
    },
    updatePreset (item) {
      this.presetActive = item.label
      this.dateRange = item.dateRange
      // update start active month
      this.activeMonthStart = this.dateRange.start.getMonth()
      this.activeYearStart = this.dateRange.start.getFullYear()
      this.activeYearEnd = this.dateRange.end.getFullYear()
    },
    setDateValue: function () {
      this.$emit('selected', this.dateRange)
      if (!this.isCompact) {
        this.toggleCalendar()
      }
    }
  }
}
