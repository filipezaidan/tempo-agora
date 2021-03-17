
export function Condition(condition){
    switch(condition){
        case 'storm':
            return icon = {
                name: 'rainy-outline',
                color: '#13c9ff'
            };
            break;
        case 'clear_day':
            return icon = {
                name: 'partly-sunny-outline',
                color: '#ffb300'
            };
            break;
        case 'rain':
            return icon = {
                name: 'rain-outline',
                cor: '#1ec9ff',
            };
            break
        default:
            return icon = {
                name: 'cloud-outline',
                color: '#1ec9ff'
            };
    }
}