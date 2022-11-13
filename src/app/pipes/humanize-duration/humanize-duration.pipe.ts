import { Pipe, PipeTransform } from '@angular/core'
import { differenceInMonths, parseISO } from 'date-fns'
import { Duration } from '@interfaces/duration'
@Pipe({
    name: 'humanizeDuration',
})
export class HumanizeDurationPipe implements PipeTransform {
    transform(range: Duration): string {
        const from = parseISO(range.from)
        const to = parseISO(range.to)
        const totalMonthsDiff = differenceInMonths(to, from)
        const years = Math.floor(totalMonthsDiff / 12)
        const months = totalMonthsDiff % 12

        return [this.yearsToStr(years), this.monthsToStr(months)].join(' ')
    }

    private monthsToStr(months: number) {
        if (!months) {
            return ''
        }
        return `${months} ${
            months === 1 ? $localize`month` : $localize`months`
        }`
    }

    private yearsToStr(years: number) {
        if (!years) {
            return ''
        }
        return `${years} ${years === 1 ? $localize`yr` : $localize`yrs`}`
    }
}
