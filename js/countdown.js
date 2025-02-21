class Countdown {
    constructor(countdownMainBlockId, dateTo, daysId = '[data-container="days"]', hoursId = '[data-container="hours"]', minsId = '[data-container="mins"]', secsId = '[data-container="secs"]') {
        this.mainBlock = document.getElementById(countdownMainBlockId);
        this.days = this.mainBlock.querySelector(daysId);
        this.hours = this.mainBlock.querySelector(hoursId);
        this.mins = this.mainBlock.querySelector(minsId);
        this.secs = this.mainBlock.querySelector(secsId);
        this.dateTo = dateTo;
    }

    countDownTo() {
        //countdown to
        let contDate = new Date(this.dateTo).getTime();
        //current time
        let now = new Date().getTime();
        //the finished number in milliseconds
        return contDate - now;
    }

    calculateTime() {
        let seconds = 1000;
        let minutes = seconds * 60;
        let hours = minutes * 60;
        let days = hours * 24;

        let textDay = Math.floor(this.countDownTo() / days);
        let textHour = Math.floor((this.countDownTo() % days) / hours);
        let textMinutes = Math.floor((this.countDownTo() % hours) / minutes);
        let textSecond = Math.floor((this.countDownTo() % minutes) / seconds);

        this.days.innerHTML = textDay;
        this.hours.innerHTML = textHour;
        this.mins.innerHTML = textMinutes;
        this.secs.innerHTML = textSecond;

        if (textDay < 100) {
            this.days.innerHTML = '0' + textDay;
        } else if (textDay < 10) {
            this.days.innerHTML = '00' + textDay;
        }

        if (textHour < 10) {
            this.hours.innerHTML = '0' + textHour;
        }

        if (textMinutes < 10) {
            this.mins.innerHTML = '0' + textMinutes;
        }

        if (textSecond < 10) {
            this.secs.innerHTML = '0' + textSecond;
        }
    }

    setInterval() {
        let time = this;
        setInterval(() => time.calculateTime(), 1000);
    }
}

// let time = new Countdown('countdown', 'December 31, 2023 00:00:00');
// time.setInterval();