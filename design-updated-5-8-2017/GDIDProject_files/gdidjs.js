
var materialSearchList;
var materialSelectedList = [];

$("#btnLogin").click(function () {
    var username = $("#txtUserId").val();
    var password = $("#txtPass").val();
    //alert(username);
    //alert(password);
    $.post("Home/Login", { "username": username, "password": password }, function (data) {
        if (data == "Fail")
            alert("Incorrect username or password!");
        else {
            switch(data)
            {
                case 'P': alert("Logged-in as Planner"); break;
                case 'CA': alert("Logged-in as Chief Artisan"); break;
                case 'A': alert("Logged-in as Artisan"); break;
                case 'SCM': alert("Logged-in as Supplier Chain Specialist"); break;
                case 'S': alert("Logged-in as Storeman"); break;
                case 'SE': alert("Logged-in as Supplier Employee"); break;
                default: alert("Unidentified role!")
            }
            window.location = "Home/Index";
        }

    });
    return;
});

$("#btnSearchMaterial").click(function () {
    var searchText = $("#txtSearchMaterial").val();
    
    var materialCategoryId = parseInt($("#ddlMaterialCategory").val());
    
    $.post("/Material/GetMaterialSearchResult", { "searchText": searchText, "materialCategoryId": materialCategoryId }, function (data) {
        $("#tblMaterialSearchResult tbody").empty();
        $("#sSearchCount").text("( " + data.length + " search result found! )");
        materialSearchList = data;
        for(var i=0; i<data.length; i++)
        {
            var newRowContent;
            if (i % 2 != 0)
                newRowContent = "<tr class='odd'><td>"+ (i+1) +"</td><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].code + "</td><td><input id='txtQuantity" + i + "'  style='Width:50px;' type='text'></td><td><input id='btnAdd'  type='button' value='Add' onclick='SelectMaterial(" + i + ")'/></td></tr>";
            else
                newRowContent = "<tr class='odd' style='background-color:#EDF3F3'><td>" + (i + 1) + "</td><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].code + "</td><td><input id='txtQuantity" + i + "'  style='Width:50px;' type='text'></td><td><input id='btnAdd'  type='button' value='Add' onclick='SelectMaterial(" + i + ")'/></td></tr>";

            $("#tblMaterialSearchResult tbody").append(newRowContent);
        }
    });

    return;
})

$("#btnSubmitCAReview").click(function () {
    var defectNum = $("#tdDefectNum").text();
    $.post("/Defect/SubmitDefectForCAReview", { "defectNum": defectNum }, function (data) {
        alert(data);
    });
    return;
})

$("#btnSubmitPlannerReview").click(function () {
    var defectNum = $("#hdnDefectId").val();
    $.post("/Defect/SubmitDefectForPlannerReview", { "defectNum": defectNum }, function (data) {
        alert(data);
    });
    return;
})

$("#btnSubmitForOrder").click(function () {
    var defectNum = $("#hdnDefectId").val();
    //alert(defectNum);
    $.post("/Defect/SubmitDefectForPurchaseOrder", { "defectNum": defectNum }, function (data) {
        alert(data);
    });
    return;
})

$("#btnGeneratePurchaseOrder").click(function () {
    var defectNum = $("#tdDefectNum").text();
    $.post("/Defect/GeneratePurchaseOrder", { "defectNum": defectNum }, function (data) {
        alert(data);
    });
    return;
})

$("#btnReadyforMaterialCollection").click(function () {
    var defectNum = $("#hdnDefectId").val();
    //alert(defectNum);
    $.post("/Defect/SubmitMaterialReadyforCollection", { "defectNum": defectNum }, function (data) {
        alert(data);
    });
    return;
})

$("#btnAssignSM").click(function () {
    var sm = $("input:radio[name='sm']:checked").attr('id');
    if (typeof sm === 'undefined')
        alert("Please select a storeman from the list.")
    else {
        alert(sm);
        //alert(defectNum);
        //$.post("/Defect/AssignStoreman", { "defectNum": defectNum }, function (data) {
        //    //alert(data);
        //    window.location = "/Defect/AssignStoreman";
        //});
        alert("Storeman is assigned successfylly.")
    }
    return;
})
$("#ddlTrades").change(function () {
    var val = $("#ddlTrades").val();
    var storemanList = JSON.parse($("#hdnStoremanList").val());
    $("#tblStoremanList tbody").empty();

    for (var i = 0; i < storemanList.length; i++)
    {
        var newRowContent;
        if (storemanList[i].tradeId == val) {
            if (i % 2 != 0)
                newRowContent = "<tr class='odd'><td id='defect-grid_c0' style='Width:50px;'>" + storemanList[i].id + "</td><td id='defect-grid_c0' style='Width:50px;'>" + storemanList[i].username + "</td><td id='defect-grid_c1' style='Width:50px;'>" + storemanList[i].email + "</td><td id='defect-grid_c2' style='Width:50px;'>" + storemanList[i].trade + "</td><td id='defect-grid_c4' style='Width:50px;'><input id='rd_" + storemanList[i].id + "' type='radio' name='sm' /> </td></tr>";
            else
                newRowContent = "<tr class='odd' style='background-color:#EDF3F3'><td id='defect-grid_c0' style='Width:50px;'>" + storemanList[i].id + "</td><td id='defect-grid_c0' style='Width:50px;'>" + storemanList[i].username + "</td><td id='defect-grid_c1' style='Width:50px;'>" + storemanList[i].email + "</td><td id='defect-grid_c2' style='Width:50px;'>" + storemanList[i].trade + "</td><td id='defect-grid_c4' style='Width:50px;'><input id='rd_" + storemanList[i].id + "' type='radio' name='sm' /> </td></tr>";

            $("#tblStoremanList tbody").append(newRowContent);
        }
        if(val ==0)
        {
            if (i % 2 != 0)
                newRowContent = "<tr class='odd'><td id='defect-grid_c0' style='Width:50px;'>" + storemanList[i].id + "</td><td id='defect-grid_c0' style='Width:50px;'>" + storemanList[i].username + "</td><td id='defect-grid_c1' style='Width:50px;'>" + storemanList[i].email + "</td><td id='defect-grid_c2' style='Width:50px;'>" + storemanList[i].trade + "</td><td id='defect-grid_c4' style='Width:50px;'><input id='rd_" + storemanList[i].id + "' type='radio' name='sm' /> </td></tr>";
            else
                newRowContent = "<tr class='odd' style='background-color:#EDF3F3'><td id='defect-grid_c0' style='Width:50px;'>" + storemanList[i].id + "</td><td id='defect-grid_c0' style='Width:50px;'>" + storemanList[i].username + "</td><td id='defect-grid_c1' style='Width:50px;'>" + storemanList[i].email + "</td><td id='defect-grid_c2' style='Width:50px;'>" + storemanList[i].trade + "</td><td id='defect-grid_c4' style='Width:50px;'><input id='rd_" + storemanList[i].id + "' type='radio' name='sm' /> </td></tr>";

            $("#tblStoremanList tbody").append(newRowContent);
        }
    }
});

$("#aLogout").click(function () {
    window.location.href = "/GDID/Home/Login";
    return;
})

function SelectMaterial(cnt)
{
    FillSelectedItemArry();
    var i = $("#tblMaterialSelected tr").length;
  
    var quant = $("#txtQuantity" + cnt).val().trim();

    if (quant == '' || quant == 0 || $.isNumeric(quant) == false)
        alert("Please select valid quanity!");
    else {
        quant = parseInt(quant);
        
        var pos = SearchSelectedMaterial(materialSearchList[cnt].code)
   
        if (pos == 0) {
            if (i % 2 != 0)
                newRowContent = "<tr class='odd'><td>" + (i) + "</td><td>" + materialSearchList[cnt].name + "</td><td>" + materialSearchList[cnt].category + "</td><td>" + materialSearchList[cnt].code + "</td><td><span id='sQuant_"+ i +"' >" + quant + "</span></td><td><input id='btnRemove'  type='button' value='Remove' onclick='RemoveMaterial(" + i + ")'/></td></tr>";
            else
                newRowContent = "<tr class='odd' style='background-color:#EDF3F3'><td>" + (i) + "</td><td>" + materialSearchList[cnt].name + "</td><td>" + materialSearchList[cnt].category + "</td><td>" + materialSearchList[cnt].code + "</td><td><span id='sQuant_" + i + "' >" + quant + "</span></td><td><input id='btnRemove'  type='button' value='Remove' onclick='RemoveMaterial(" + i + ")'/></td></tr>";

            $("#tblMaterialSelected tbody").append(newRowContent);

            var objMaterial = new Object();
            objMaterial.pos = i;
            objMaterial.id = materialSearchList[cnt].id;
            objMaterial.name = materialSearchList[cnt].name;
            objMaterial.code = materialSearchList[cnt].code;
            objMaterial.material_category_id = materialSearchList[cnt].material_category_id
            objMaterial.category = materialSearchList[cnt].category
            objMaterial.quantity = quant;
            materialSelectedList.push(objMaterial);
        }
        else {
            var tot = parseInt($("#sQuant_" + pos).text()) + parseInt(quant);
            $("#sQuant_" + pos).text(tot);
            materialSelectedList[pos-1].quantity = tot;
            //alert($("#sQuant" + pos).text());
        }
    }
    return;
}

function SearchSelectedMaterial(code)
{
    if (materialSelectedList.length == 0)
        return 0;

    for(var i=0; i<materialSelectedList.length;i++)
    {
        if (materialSelectedList[i].code == code)
            return materialSelectedList[i].pos;
    }
    return 0;
}

$("#btnSaveMaterialsforDefect").click(function () {
    //alert(materialSelectedList.length);
    var sendData = new Object();
    sendData.MaterialList = materialSelectedList;
    sendData.defect_id = $("#hdnDefectId").val();
    sendData.problemStatement = $("#txtProblemStat").val();
    sendData.rootCause = $("#txtRootCause").val();
    sendData.correctiveAction = $("#txtCorrAction").val();
    //alert(sendData.defect_id);
    $.post("/Material/SaveMaterialsforDefect", { "materialList": sendData }, function (data) {
        alert(data);
    });
    return;
})

function FillSelectedItemArry()
{
    //alert('test' + materialSelectedList.length);
    if (materialSelectedList.length == 0)
    {
        var i = $("#tblMaterialSelected tr").length;
        //alert(i);

        //$("#tblMaterialSelected tr").each(function () {
        //    var $tds = $(this).find('td').each(function () {
        //        alert($(this).text());
        //    });
        //});
        //var objMaterial = new Object();
        // $("#tblMaterialSelected tr").each(function () {
        //     var $tds = $(this).find('td').each(function (cntd) {
        //         if (cntd == 1)
        //             objMaterial.pos = $(this).text();
        //         if (cntd == 2)
        //             objMaterial.name = $(this).text();
        //         if (cntd == 3)
        //             objMaterial.pos = $(this).text();
        //         if (cntd == 4)
        //             objMaterial.pos = $(this).text();
        //         if (cntd == 5)
        //             objMaterial.pos = $(this).text();
        //    });
        //});
    }
    return;
}
