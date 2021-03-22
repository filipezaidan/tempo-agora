export function ConditionSlug(condition){
    switch(condition){
        case 'clear_day':
            return icon = {
                name: 'sunny',
                color: '#ffb300'
            };
            break

        case 'clear_night':
            return icon = {
                name: 'moon',
                color: '#fff'
            };
            break

        case 'rain':
            return icon = {
                name: 'rainy',
                color: '#fff'
            };
            break

        case 'storm': 
            return icon = {
                name: 'thunderstorm',
                color: '#fff'
            };
            break
        case 'cloudly_day':
            return icon = {
                name: 'partly-sunny',
                color: '#fff'
            };
            break
        default:
            return icon = {
                name: 'cloud',
                color: '#fff'
            };
    }
}
