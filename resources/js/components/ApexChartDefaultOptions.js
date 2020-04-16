class ApexChartDefaultOptions {

    static lineChart() {
        return {
            chart: {
                type: 'line'
            },
            // TODO: use this title in Question instead of the <h5>
            // title: {
            //     text: 'Monthly Inflation in Argentina, 2002',
            //     floating: true,
            //     offsetY: 430,
            //     align: 'center',
            //     style: {
            //         color: '#444'
            //     }
            // }
        };
    }

    static barChart() {
        return {
            chart: {
                type: 'bar'
            },
            dataLabels: {
                enabled: true,
                offsetY: -10,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },
            // TODO: use this title in Question instead of the <h5>
            // title: {
            //     text: 'Monthly Inflation in Argentina, 2002',
            //     floating: true,
            //     offsetY: 430,
            //     align: 'center',
            //     style: {
            //         color: '#444'
            //     }
            // }
        };
    }

}

export default ApexChartDefaultOptions;
