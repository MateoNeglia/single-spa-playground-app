//import e from '../event-bus';
window.rule = {};

window.rule.donationCount = {
    count: 0,
    addCountToDonations(newCount) {        
        window.rule.donationCount.count += parseInt(newCount);
        window.dispatchEvent( new Event('donationChange'));
        //e.emit('donationChange', this.count);        
    } 
}

window.rule.rescuedGreyhounds = {
    dogCount: 0,
    addDogToChart() {        
        //window.rule.rescuedGreyhounds.dogCount += 1;
        //e.emit('dogCountChange', this.dogCount);        
        window.dispatchEvent(new Event('dogCountChange'));
    } 
}