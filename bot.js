const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'playclaft.aternos.me',
        port: 50116,
        username: 'Raboot',
        version: '1.21.2'
    });

    bot.on('spawn', () => {
        bot.clearControlStates();
        console.log(`[NPC] El bot ha aparecido correctamente en el mapa.`);
    });

    bot.on('login', () => {
        console.log(`[NPC] Conexión establecida con el servidor de Minecraft.`);
    });

    setInterval(async () => {
        if (!bot || !bot.entity) return;

        try {
            const chestBlock = bot.findBlock({
                matching: bot.registry.blocksByName.chest.id,
                maxDistance: 5
            });

            if (chestBlock) {
                console.log('[NPC] Interactuando con el contenedor cercano...');
                const chest = await bot.openChest(chestBlock);
                console.log('[NPC] Contenedor abierto.');
                await new Promise(resolve => setTimeout(resolve, 2000));
                chest.close();
                console.log('[NPC] Contenedor cerrado.');
            } else {
                console.log('[NPC] Aviso: No se detectó ningún contenedor válido cerca.');
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            bot.clearControlStates();
            bot.setControlState('jump', true);
            setTimeout(() => {
                bot.setControlState('jump', false);
                bot.clearControlStates();
            }, 400);
            console.log('[NPC] Acción anti-inactividad completada con éxito.');

        } catch (err) {
            console.log(`[NPC] Error en el ciclo de ejecución: ${err.message}`);
        }
    }, 45000);

    bot.on('end', (reason) => {
        console.log(`[NPC] Conexión finalizada por: ${reason}. Reintentando en 10 segundos...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log(`[NPC] Error crítico de red detectado: ${err}`));
}

createBot();
