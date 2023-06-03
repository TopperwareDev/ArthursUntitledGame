/* 
    This script is responsible for creating game object
    
    Window referes to the window/broser where the game is played in
*/

function startWindow(){
    connect().then(() => {
        const game = new Game();
    }).catch(() => {
        alert('Some thing went wrong when connecting to the game, please close the window and try again. This is most likely because you are no longer authenticated. The game will not start unless all errors are resolved please try to login again.');
    });
}