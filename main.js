const input_text = document.getElementById("input-text");
const input_name = document.getElementById("input-name");
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const images = document.getElementById("images");
const send_button = document.getElementById("send-button");
const img_num = 11;
num = Math.ceil(Math.random()*img_num);

function set_images(){
    
    for (i=0; i<img_num; i++){
        img_element = document.createElement("img");
        img_element.id = `img-${i+1}`;
        img_element.src = `image/${(i+1).toString().padStart(2, "0")}.png`;
        images.appendChild(img_element);
        //イベント
        img_element.addEventListener("click", (event) => {
            num = parseInt(event.target.id.split("-")[1]);
            update_cvs();
        });
    }
}
function cvs_to_image()
{
  png = cvs.toDataURL();
  document.getElementById("haiku-image").src = png;
}
function init_cvs(){
    image = document.getElementById(`img-${num}`);
    //image.onload = () => ctx.drawImage(image, 0, 0);
    ctx.drawImage(image, 0, 0);
    console.log("背景描画")
}

function update_cvs(){
    init_cvs();
    font_size = 30;
    ctx.font = `${font_size}px serif`;
    text = input_text.value;
    name = input_name.value;
    
    ctx.fillStyle = num == 4 || num == 9 || num == 10? "white": "#101010";

    //本文
    //座標や行間の設定
    line_width = font_size * 1.5;
    y_start = 140;
    text_pos = [cvs.width/2 + (((text.match(/\n/g) || []).length)*line_width-font_size)/2, y_start];
    for (i=0; i<text.length; i++){
        ctx.fillText(text.substr(i, 1), text_pos[0], text_pos[1]);

        //次の座標をセットする
        if (text.substr(i, 1) == "\n"){
            text_pos[0] -= line_width;
            text_pos[1] = y_start;
        }else{
            text_pos[1] += font_size;
        }
    }

    //名前
    font_size = 24;
    ctx.font = `${font_size}px serif`;

    name_pos = [20, cvs.height-50];
    for (i=0; i<name.length; i++){
        ctx.fillText(name.substr(name.length-i-1, 1), name_pos[0], name_pos[1]);
        name_pos[1] -= font_size;
    }

    //imageに変換
    cvs_to_image();
}
function load(){
    set_images();
    init_cvs();

    send_button.addEventListener("click", update_cvs);
}

load();

