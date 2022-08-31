import chalk from 'chalk';

export default async function sendLog(type, packet, logMessage) {
    if (type === 1) {
        console.log(chalk.blue.bgBlack.bold('[Mixsecurity:' + chalk.blue.whiteBright.bold(packet.toString()) + ']') + '; ' + chalk.white.bgBlack.bold(logMessage.toString()));
    } else if (type === 2) {
        console.log(chalk.red.bgBlack.bold('[Mixsecurity:'+ chalk.blue.whiteBright.bold(packet.toString()) +']') +'; ' + chalk.redBright.bgBlack.bold(logMessage.toString()));
    } else if (type === 3) {
        console.log(chalk.green.bgBlack.bold('[Mixsecurity:'+ chalk.blue.whiteBright.bold(packet.toString()) +']') +'; ' + chalk.green.bgBlack.bold(logMessage.toString()));
    }
}
