//用代理实现查看数组中的所有name值,并根据object中的name返回对象
export function useArrayFactory(target) {
    const handler = {
        get: (target, property) => {
            if (property === "allNames") {
                return target.map(x => x.name)
            }
            const filerList = target.filter(x => x.name === property)
            if (filerList.length === 1) {
                return filerList[0]
            }
            return Reflect.get(target, property)
        }
    }
    return new Proxy(target, handler)
}

export function getSeries(data, name = "", type = 'bar') {
    return {
        name: name,
        data: data,
        type: type,
        label: {show: true},
        showBackground: true,
        // backgroundStyle: {
        //     color: 'rgb(227,230,238)'
        // }
    }
}

export function getOption(title, xData, seriesData, showLegend = false,gridBottom="10%") {
    return {
        title: {text: title, textStyle: {fontSize: 14}},
        legend: {show: showLegend,left:'7%'},
        tooltip: {show: true, trigger: 'axis'},
        grid: {left: "3%", right: "3%", bottom: gridBottom,top:"15%"},
        xAxis: {
            type: 'category',
            axisLabel: {fontSize: 12},
            data: xData
        },
        yAxis: {
            type: 'value'
        },
        series: seriesData
    }
}

export function deleteZeroIndex(xDataList, seriesData) {
    //去除都为0的部门
    let retDataList
    let retSeriesData = {}
    const zeroIndexList = []
    xDataList.forEach((_, index) => {
        let flagZero = true
        for (let item in seriesData) {
            if (seriesData[item][index]) {
                flagZero = false
                break
            }
        }
        if (flagZero) zeroIndexList.push(index)
    })

    retDataList = xDataList.filter((_, index) => zeroIndexList.indexOf(index) === -1)
    for (let item in seriesData) {
        retSeriesData[item] = seriesData[item].filter((_, index) => zeroIndexList.indexOf(index) === -1)
    }

    return [retDataList, retSeriesData]
}

export function getBriefName(name,length){
    //对比个数小于4,取10个字符
    if(length <8){
        if (name.length <= 10) return name
        // 前6后4
        return name.match(/.*_(.+)/)[1]
    }

    if(length >= 8 && length <16){
        if (name.length <= 4) return name
        // 前6后4
        return `${name.slice(0, 2)}.${name.slice(-4)}`
    }
    return `${name.slice(0, 1)}.${name.slice(-4)}`

}