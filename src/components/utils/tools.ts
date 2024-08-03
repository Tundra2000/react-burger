export function russianStatus(status: string) {
    let statusRus = '';
    switch (status) {
        case 'done':
            statusRus = 'Выполнен'
            break;
        case 'created':
            statusRus = 'Создан'
            break;
        case 'pending':
            statusRus = 'Готовится'
            break;

        default:
            statusRus = status;
    }
    return statusRus
}