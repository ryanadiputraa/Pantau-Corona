const dataFormatting = {
    
    format: format = (data, point = 0) => {
        data = data.split('');
        for (i = (data.length - 1); i > 0; i--) {
            point++;
            if(point === 3) {
                data.splice(i, 0, ".")
                point = 0;
            }
        }
        return data.join('')
    },

    changer: changer = (data, point = 0) => {
        data = data.split('');
        for (i = (data.length - 1); i > 0; i--) {
            point++;
            if(point === 4) {
                data.splice(i, 1, ".")
                point = 0;
            }
        }
        return data.join('')
    }
}

module.exports = dataFormatting;
