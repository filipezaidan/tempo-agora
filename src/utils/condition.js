export function Condition(condition){
    switch(condition){
        case 'storm':
            return icon = {
                name: 'thunderstorm-outline',
                color: '#13c9ff'
            };
            break;
        case 'clear_day':
            return icon = {
                name: 'sunny-outline',
                color: '#ffb300'
            };
            break;
        case 'rain':
            return icon = {
                name: 'rainy-outline',
                color: '#1ec9ff',
            };
            break
        default:
            return icon = {
                name: 'cloud-outline',
                color: '#1ec9ff'
            };
    }
}