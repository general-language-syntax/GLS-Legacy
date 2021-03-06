var GLS;
(function (GLS) {
    var Languages;
    (function (Languages) {
        Languages.Ruby = new GLS.Language().setName("Ruby").setExtension("rb").setPrintFunction("puts").setSemiColon("").setArrayClass("Array").setArrayLength(".length").setArrayInitializationAsNewStatic(true).setArrayNegativeIndices(true).setBreak("break").setClassConstructorAsStatic(true).setClassParentName("super").setClassConstructorName("initialize").setClassConstructorLoose(true).setClassEnder("end").setClassExtends("<").setClassFunctionsStart("def ").setClassFunctionsTakeThis(false).setClassFunctionsThis("").setClassMemberFunctionGetStart("").setClassMemberFunctionGetEnd("").setClassMemberVariableDefault("").setClassMemberVariablePrivacy(false).setClassMemberVariableStarter("@").setClassNewer("new").setClassPrivacy(false).setClassPublicAlias("public ").setClassStaticLabel("").setClassStartLeft("class ").setClassStartRight("").setClassThis("@").setClassThisAccess("").setCommentorBlockStart("=begin").setCommentorBlockEnd("=end").setCommentorInline("#").setConditionStartLeft(" ").setConditionStartRight("").setConditionContinueLeft(" ").setConditionContinueRight("").setConditionEnd("end").setContinue("next").setDictionaryInitializeEnder("}").setDictionaryInitializeKeyComma(",").setDictionaryInitializeStarter(" {").setDictionaryKeyCheckAsFunction(true).setDictionaryKeyChecker("has_key?").setDictionaryKeyLeft("").setDictionaryKeyMiddle(": ").setDictionaryKeyRight("").setElif("elsif").setElse("else").setExceptionCatch("rescue ").setExceptionClass("Exception").setExceptionErrorPrefix(" => ").setExceptionFinally("ensure").setExceptionThrow("raise").setExceptionTry("begin").setFileEndLine("").setFileStartLeft("").setFileStartRight("").setForEachAsMethod(true).setForEachInner("|").setForEachStarter(".each do |").setFunctionDefine("def ").setFunctionDefineRight("").setFunctionDefineEnd("end").setIf("if").setIncludeDictionaryType("").setIncludeEnder("'").setIncludeFileExtension(true).setIncludeStarter("require '").setLambdaDeclareEnder(" }").setLambdaDeclareMiddle("| { ").setLambdaDeclareStarter("lambda do |").setLambdaTypeDeclarationAsInterface(true).setLambdaTypeDeclarationEnd(["}"]).setLambdaTypeDeclarationMiddle(["", ";"]).setLambdaTypeDeclarationRequired(true).setLambdaTypeDeclarationStart(["interface ", " {"]).setMainEndLine("end").setMainStartLine("if __FILE__ == $PROGRAM_NAME").setToString(".to_s").setUndefined("nil").setRangedForLoops(true).setRangedForLoopsStart(" in ").setRangedForLoopsMiddle("..").setRangedForLoopsEnd("").setFunctionReturnsExplicit(false).setVariableTypesExplicit(false).setVariableDeclareStart("").addNativeFunctionAliases("array", {
            "length": {
                "alias": "length",
                "placement": "member",
                "usage": "variable"
            }
        }).addNativeFunctionAliases("string", {
            "length": {
                "alias": "length",
                "placement": "member",
                "usage": "variable"
            },
            "find": {
                "alias": "index",
                "placement": "member",
                "usage": "function"
            },
            "substring": {
                "alias": "substring",
                "placement": "member",
                "usage": "function"
            }
        });
    })(Languages = GLS.Languages || (GLS.Languages = {}));
})(GLS || (GLS = {}));
