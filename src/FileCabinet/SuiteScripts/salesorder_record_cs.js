/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
/**
 * @param{record} record
 */
function(record) {
    function pageInit(){

    }

    function completeTransaction(){
        console.log("Helloo");
    }
 
   

    return {
        pageInit: pageInit,
        completeTransaction: completeTransaction
        
    };
    
});
