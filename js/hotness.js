$(document).ready(function() {
    var hotness = new Hotness(
        $("#heatmap-area"),
        $("#input-data-csv"),
        $("#input-data-image"),
        $("#input-data-generate-button")
    );
    hotness.update();
});

function Hotness(heatmap, csv, imgUrl, genButton) {
    var me = this;
    this.m_heatMap = heatmap;
    this.m_csv = csv;
    this.m_imgUrl = imgUrl;
    this.m_imgUrlVal = "";
    this.m_genButton = genButton;

    this.m_hm = h337.create({"element":this.m_heatMap.get(0), "radius":25, "visible":true});

    this.m_genButton.click(function(){
        me.update();
    });
};

Hotness.prototype = {
    update: function() {
        var bgImgUrl = this.m_imgUrl.val();
        if (bgImgUrl !== this.m_imgUrlVal) {
            this.m_imgUrlVal = bgImgUrl;
            this.m_heatMap.css("background-image", "url(" + bgImgUrl + ")");
        }

        var txtData = this.m_csv.val();
        var rows = [];

        var txtLines = txtData.split("\n");
        var maxVal = 0;
        for (var i in txtLines) {
            if (i === "0" || i === 0) {
                continue;
            }
            var line = txtLines[i];
            var cols = line.split(",");
            if (cols.length < 3) {
                continue;
            }
            rows.push({x: cols[0], y: cols[1], count: cols[2]});
            if (cols[2] > maxVal) {
                maxVal = cols[2];
            }
        }

        var data = {max: maxVal, data: rows};

        this.m_hm.store.setDataSet(data);
    }
};