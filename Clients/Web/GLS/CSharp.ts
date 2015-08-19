module GLS.Languages {
    export var CSharp: Language = new GLS.Language()
        .setName("CSharp")
        .setExtension("cs")
        .setPrintFunction("System.Console.WriteLine")
        .setSemiColon(";")
        .setArrayClass("Array")
        .setArrayInitializationAsNewTyped(true)
        .setArrayLength(".Length")
        .setClassConstructorName("")
        .setClassConstructorInheritedShorthand(true)
        .setClassEnder("};")
        .setClassExtends("extends")
        .setClassFunctionsTakeThis(false)
        .setClassFunctionsStart("")
        .setClassMemberVariableDefault("")
        .setClassMemberVariablePrivacy(true)
        .setClassMemberVariableStarter("")
        .setClassNewer("new ")
        .setClassParentName("base")
        .setClassPrivacy(true)
        .setClassStartLeft("class ")
        .setClassStartRight(" {")
        .setClassTemplates(true)
        .setClassTemplatesBetween(", ")
        .setClassThis("this")
        .setClassThisAccess(".")
        .setCommentorBlockStart("/*")
        .setCommentorBlockEnd("*/")
        .setCommentorInline("//")
        .setConditionStartLeft(" (")
        .setConditionStartRight(") {")
        .setConditionContinueLeft("} ")
        .setConditionContinueRight(" {")
        .setConditionEnd("}")
        .setDictionaryInitializeEnder("}")
        .setDictionaryInitializeKeyComma(",")
        .setDictionaryInitializeStarter(" {")
        .setDictionaryClass("Dictionary")
        .setDictionaryInitializationAsNew(true)
        .setDictionaryKeyCheckAsFunction(true)
        .setDictionaryKeyChecker("ContainsKey")
        .setDictionaryKeyLeft("{ ")
        .setDictionaryKeyMiddle(", ")
        .setDictionaryKeyRight(" }")
        .setFileEndLine("}")
        .setFileStartLeft("public class ")
        .setFileStartRight(" {")
        .setFunctionDefine("")
        .setFunctionDefineRight(" {")
        .setFunctionDefineEnd("}")
        .setFunctionReturnsExplicit(true)
        .setFunctionTypeAfterName(false)
        .setLambdaTypeDeclarationEnd(["", ";"])
        .setLambdaTypeDeclarationMiddle(["(", ")"])
        .setLambdaTypeDeclarationRequired(true)
        .setLambdaTypeDeclarationStart(["", "delegate"])
        .setMainEndLine("}")
        .setMainStartLine("public static void Main() {")
        .setToString(".ToString()")
        .setUndefined("null")
        .setRangedForLoops(false)
        .setVariableDeclareStart("")
        .setVariableTypesExplicit(true)
        .setVariableTypesAfterName(false)
        .addTypeAlias("int", "number")
        .addTypeAlias("bool", "boolean");
}