//socket event
let socket;
let items = [];
socket = io('https://receive-demo.onrender.com');
//socket = io('http://192.168.0.126:3000');
let serverState = document.querySelector('.server-state');

socket.on('start', (msg) => {
    serverState.innerHTML = 'server connect';
    console.log(msg);
})

socket.on('display', (msg) => {
    items[0].destroy();
    items.shift();
    items.push(new Item(msg[1]));

    items.forEach((e) => e.animation());

    items[items.length - 1].fadein(["ID : " + msg[0], "messsage : " + msg[1]]);

})


setInterval(() => {
    if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            items[i].display(i);
        }
    }

}, 5);




class Item {

    constructor(msg) {

        this.item = document.createElement("div");
        this.item.innerHTML = msg;
        this.item.style.position = 'absolute';
        this.item.style.height = '100px';
        this.item.style.width = '100px';
        this.item.style.top = '40px';
        this.item.classList.add('text-light');
        this.item.classList.add('w-100');
        this.item.classList.add('text-center');
        this.item.classList.add('p-3');
        this.item.classList.add('border');
        document.querySelector('.App').appendChild(this.item);
        
    }

    display(index) {

        this.item.style.zIndex = 15 - index;
        this.item.style.transition = 'transform 2s';
        this.item.style.transform = 'translateY(' + index * 110 + 'px)';

        // this.color1 = Math.floor(Math.random() * 255);
        // this.color2 = Math.floor(Math.random() * 255);
        // this.color3 = Math.floor(Math.random() * 255);
        // this.item.style.background = 'rgb(' +this.color1+ ',' +this.color2+ ',' +this.color3+ ')';
    }

    destroy() {
        document.querySelector('.App').removeChild(this.item);
    }

    animation() {

        let b = baffle(this.item, {
            characters: ['#', '█', '█ █', "⊠"],
            speed: 80,
        });

        b.reveal(10000);
    }

    fadein(msg) {

        // zoom.to({
        //     element: this.item
        // });
        zoom.to({
            x: innerWidth/2,
            y: innerHeight-100,
            scale: 1.2
        });

        var date = new Typed(this.item, {
            strings: [msg[0], msg[1]],
            typeSpeed: 50,
            onComplete: (self) => {
                zoom.out();
            },
        });
    }
}


for (let i = 0; i < 6; i++) {
    items[i] = new Item('');
}