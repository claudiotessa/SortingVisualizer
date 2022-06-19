const PRIMARY_COLOR = "#007fff";
const SELECTION_COLORS = ["#ff1744", "#ff4569"];

const MAX_BAR_HEIGHT = 70;
const container = $("#container"); // bar container
let values = [];
let sortSpeed = $("#sort-speed").val() * 100;

let canGo = false;
let numBars = 20;

$("#randomize").click(() => {
    values = generateBars(numBars);
    renderBars(values);
    canGo = false;
});

$("#num-bars").change(function () {
    canGo = false;
    numBars = $(this).val();
    values = generateBars(numBars);
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
        case "selection":
            values = selectionSort(values);
            break;
        case "insertion":
            values = insertionSort(values);
            break;
        case "quick":
            values = quickSort(values);
            console.log(values);
            //endSortAnimation();
            break;
        case "counting":
            values = countingSort(values);
            break;
        case "shell":
            values = shellSort(values);
            break;
        default:
            canGo = false;
            alert("Select an algorithm");
            break;
    }
});

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
const generateBars = (numBars) => {
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
    endSortAnimation();
    return array;
};
const selectionSort = async (array) => {
    for (let i = 0; i < array.length - 1; i++) {
        let minPos = i;
        for (let j = i + 1; j < array.length; j++) {
            if (!canGo) return;
            if (array[j] < array[minPos]) {
                minPos = j;
            }
        }
        if (i !== minPos) {
            const tmp = array[i];
            array[i] = array[minPos];
            array[minPos] = tmp;

            container
                .children()
                .eq(i)
                .text(array[i])
                .animate({ height: array[i] + "vh" }, sortSpeed)
                .css({ background: SELECTION_COLORS[0] });

            container
                .children()
                .eq(minPos)
                .text(array[minPos])
                .animate({ height: array[minPos] + "vh" }, sortSpeed)
                .css({ background: SELECTION_COLORS[1] });

            await delay(sortSpeed);
            container
                .children()
                .slice(i, minPos + 1)
                .css({ background: PRIMARY_COLOR });
        }
    }
    endSortAnimation();
    return array;
};
const insertionSort = async (array) => {
    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0 && array[j] < array[j - 1]; j--) {
            if (!canGo) return;

            const tmp = array[j];
            array[j] = array[j - 1];
            array[j - 1] = tmp;

            container
                .children()
                .eq(j)
                .text(array[j])
                .animate({ height: array[j] + "vh" }, sortSpeed)
                .css({ background: SELECTION_COLORS[0] });

            container
                .children()
                .eq(j - 1)
                .text(array[j - 1])
                .animate({ height: array[j - 1] + "vh" }, sortSpeed)
                .css({ background: SELECTION_COLORS[1] });

            await delay(sortSpeed);
            container
                .children()
                .slice(j - 1, j + 1)
                .css({ background: PRIMARY_COLOR });
        }
    }
    endSortAnimation();
    return array;
};
const quickSort = async (array, left = 0, right = array.length - 1) => {
    const partition = async (arr, left, right) => {
        var pivot = arr[Math.floor((right + left) / 2)]; //middle element
        var i = left; //left pointer
        var j = right; //right pointer
        while (i <= j) {
            while (arr[i] < pivot) {
                i++;
            }
            while (arr[j] > pivot) {
                j--;
            }
            if (i <= j) {
                if (!canGo) return;

                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;

                container
                    .children()
                    .eq(i)
                    .text(arr[i])
                    .animate({ height: arr[i] + "vh" }, sortSpeed)
                    .css({ background: SELECTION_COLORS[0] });

                container
                    .children()
                    .eq(j)
                    .text(arr[j])
                    .animate({ height: arr[j] + "vh" }, sortSpeed)
                    .css({ background: SELECTION_COLORS[1] });

                await delay(sortSpeed);
                container.children().eq(i).css({ background: PRIMARY_COLOR });
                container.children().eq(j).css({ background: PRIMARY_COLOR });

                i++;
                j--;
            }
        }
        return i;
    };

    let index;
    if (array.length > 1) {
        index = await partition(array, left, right); //index returned from partition
        console.log(
            "🚀 ~ file: index.js ~ line 235 ~ quickSort ~ index",
            index
        );
        if (left < index - 1) {
            //more elements on the left side of the pivot
            quickSort(array, left, index - 1);
        }
        if (index < right) {
            //more elements on the right side of the pivot
            quickSort(array, index, right);
        }
    }
    return array;
};
const countingSort = async (array) => {
    const min = array.reduce((acc, v) => (acc < v ? acc : v));
    const max = array.reduce((acc, v) => (acc > v ? acc : v));
    const count = new Map();

    for (let i = min; i <= max; i++) {
        count[i] = 0;
    }
    for (let i = 0; i < array.length; i++) {
        if (!canGo) return;
        count[array[i]] += 1;
        container.children().eq(i).css({ background: SELECTION_COLORS[1] });
        await delay(sortSpeed);
        container.children().eq(i).css({ background: PRIMARY_COLOR });
    }

    const sortedArr = [];
    let j = 0;
    for (let i = min; i <= max; i++) {
        while (count[i] > 0) {
            if (!canGo) return;
            sortedArr.push(i);
            container
                .children()
                .eq(j)
                .text(i)
                .animate({ height: i + "vh" }, sortSpeed)
                .css({ background: SELECTION_COLORS[0] });
            await delay(sortSpeed);
            container.children().eq(j).css({ background: PRIMARY_COLOR });
            count[i]--;
            j++;
        }
    }
    endSortAnimation();
    return sortedArr;
};
const shellSort = async (array) => {
    let n = array.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i += 1) {
            let temp = array[i];

            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                if (!canGo) return;
                array[j] = array[j - gap];
                container
                    .children()
                    .eq(j)
                    .text(array[j])
                    .animate({ height: array[j] + "vh" }, sortSpeed)
                    .css({ background: SELECTION_COLORS[0] });
                await delay(sortSpeed);
                container.children().eq(j).css({ background: PRIMARY_COLOR });
            }

            array[j] = temp;
            await delay(sortSpeed);
            container
                .children()
                .eq(j)
                .text(array[j])
                .animate({ height: array[j] + "vh" }, sortSpeed)
                .css({ background: SELECTION_COLORS[0] });
            await delay(sortSpeed);
            container.children().eq(j).css({ background: PRIMARY_COLOR });
        }
    }
    endSortAnimation();
    return array;
};

const endSortAnimation = async () => {
    for (let i = 0; i < container.children().length; i++) {
        container.children().eq(i).css({ background: "#00ff00" });
        await delay(50);
    }
    await delay(500);
    container.children().css({ background: PRIMARY_COLOR });
};
values = generateBars(numBars);
renderBars(values);
