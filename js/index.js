const PRIMARY_COLOR = "#007fff";
const SELECTION_COLORS = ["#ff1744", "#ff4569"];

const MAX_BAR_HEIGHT = 70;
const container = $("#container"); // bar container
let values = [];
let sortSpeed = $("#sort-speed").val() * 100;

let canGo = false;

$("#randomize").click(() => {
    values = generateBars();
    renderBars(values);
    canGo = false;
});

$("#num-bars").change(() => {
    canGo = false;
    values = generateBars();
    renderBars(values);
});

$("#sort-speed").change(function () {
    sortSpeed = $(this).val() * 100;
});

$("#start").click(function () {
    canGo = true;
    switch ($("#algorithm").val()) {
        case "bubble":
            values = bubbleSort(values);
            break;
        case "quick":
            quickSort();
            break;
        default:
            canGo = false;
            console.log("no algorithm chosen");
            break;
    }
});

const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

const generateBars = () => {
    const numBars = $("#num-bars").val();
    const array = [];
    for (let i = 0; i < numBars; i++) {
        const n = Math.floor(Math.random() * (MAX_BAR_HEIGHT - 5) + 5);
        array.push(n);
    }
    return array;
};

const renderBars = (array) => {
    container.empty();
    for (let i = 0; i < array.length; i++) {
        const bar = $(`<div class="bar">${array[i]}</div>`).css({
            height: array[i] + "vh",
            width: "25px",
            background: PRIMARY_COLOR,
        });
        container.append(bar);
    }
};

const bubbleSort = async (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (!canGo) {
                return;
            }
            if (array[j] > array[j + 1]) {
                const tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;

                container
                    .children()
                    .eq(j)
                    .text(array[j])
                    .animate({ height: array[j] + "vh" }, sortSpeed)
                    .css({ background: SELECTION_COLORS[0] });

                container
                    .children()
                    .eq(j + 1)
                    .text(array[j + 1])
                    .animate({ height: array[j + 1] + "vh" }, sortSpeed)
                    .css({ background: SELECTION_COLORS[1] });

                await delay(sortSpeed);
                container
                    .children()
                    .slice(j, j + 2)
                    .css({ background: PRIMARY_COLOR });
            }
        }
    }
    return array;
};
const quickSort = () => {};

values = generateBars();
renderBars(values);
