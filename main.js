const input_text = document.getElementById("input-text");
const input_name = document.getElementById("input-name");
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

function init_cvs(){
    ctx.fillStyle = "#dddddd";
    ctx.fillRect(0, 0, cvs.width, cvs.height)
}
function update_cvs(){
    init_cvs();
    font_size = 30;
    ctx.fillStyle = "#505050";
    ctx.font = `${font_size}px serif`;
    text = input_text.value;
    name = input_name.value;

    //本文
    //座標や行間の設定
    y_start = 120;
    text_pos = [cvs.width-100, y_start];
    for (i=0; i<text.length; i++){
        ctx.fillText(text.substr(i, 1), text_pos[0], text_pos[1]);

        //次の座標をセットする
        if (text.substr(i, 1) == "\n"){
            text_pos[0] -= font_size*1.5;
            text_pos[1] = y_start;
        }else{
            text_pos[1] += font_size;
        }
    }

    //名前
    name_pos = [20, cvs.height-30];
    for (i=0; i<name.length; i++){
        ctx.fillText(name.substr(name.length-i-1, 1), name_pos[0], name_pos[1]);
        name_pos[1] -= font_size;
    }
}
input_text.addEventListener("keyup", update_cvs, false);
input_name.addEventListener("keyup", update_cvs, false);

init_cvs()
