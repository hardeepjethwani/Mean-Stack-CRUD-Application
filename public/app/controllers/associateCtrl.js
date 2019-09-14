angular.module('associateControllers',['associateServices'])

.controller('associateCtrl',function($route, $location,$timeout,Associate,listAssociate,updAssociate,deleteAssociate){
    var app=this;    

    //Returning List of Associates along with their details
    listAssociate.getList().then(function(data){
        if(angular.isArray(data.data)){
        app.listData = data.data;
        // console.log(data.data)
        }
        else{
            $location.path('/login');
        }
        
    });
    
    //Editing Associate Details
    this.editAssociate = function(data){
        // console.log(data);
        updAssociate.saveAssociateData(data)
            $location.path('/editAssociate')

    }

    //Deleteing an Associate
    this.deleteAssociate = function(emp){
        deleteAssociate.delete({"emp": emp}).then(function(data){
            if(data.data.success){
                $route.reload();    
            }
           
        })
    }
    
    //Adding an associate
    this.regAssociate = function (assoData) {
        app.loading=true;
        app.errorMsg=false;
        app.successMsg=false;

        Associate.create(app.assoData).then(function(data){
            
            if(data.data.success){
                app.loading=false;

                //creating a success message and redirect to Associate List Page
                app.successMsg = data.data.message + "......Redirecting";

                //now we needto go to the home page after successful registration. So we will use location.path of angular
                $timeout(function(){
                    $location.path('/viewAssociate');
                },2000);

            }else{
                app.loading=false;
                //creating a error message
                app.errorMsg = data.data.message;
            }
        });
    };


    //Export Pdf using html2canvas
    app.ExportPDF = function () {
        html2canvas(tblCustomers, {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 600
                    }]
                };
                pdfMake.createPdf(docDefinition).download("associateDetails.pdf");
            }
        });
    };


    //Export CSV File using Jquery table2excel
    app.ExportCSV = function () {
           
            $("#table").table2csv({
                excludeColumns: ".noExport",
                name: "Data",
                filename: "AssociateDetails.csv",
                columns: [0, 1, 2, 3, 4] 
            });
    };
    
})
