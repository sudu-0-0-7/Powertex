/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
    /**
     * @param{record} record
     */
    function (record) {
        function pageInit() {

        }

        function createTransactions(currentRecId, invoiceSearchResultCount, itemFulfillmentsearchResultCount) {
            try {
                if (itemFulfillmentsearchResultCount == 0) {
                    var itemFulfillmentRecord = record.transform({
                        fromType: 'salesorder',
                        fromId: currentRecId,
                        toType: 'itemfulfillment',
                        isDynamic: true
                    });
                    itemFulfillmentRecord.save();
                }

                if (invoiceSearchResultCount == 0) {
                    var invoiceRecord = record.transform({
                        fromType: 'salesorder',
                        fromId: currentRecId,
                        toType: 'invoice',
                        isDynamic: true,
                    });
                    invoiceRecord.save();
                }
                window.location.reload();
            }
            catch (e) {
                log.error("error in beforeload", e.message);
                return false;
            }
        }

        return {
            pageInit: pageInit,
            createTransactions: createTransactions
        };

    });
