module GLS {
    export interface Printer {
        (functionArgs: string[], isInline: boolean): any[];
    }

    export class Language {
        private Printers: any;
        private OperationAliases: any;
        private TypeAliases: any;
        private ValueAliases: any;
        private NativeFunctionAliases: any;
        
        // General information
        private Name: string;
        private Extension: string;
        private PrintFunction: string;
        private SemiColon: string;
        
        // Comments
        private CommentorBlockStart: string;
        private CommentorBlockEnd: string;
        private CommentorInline: string;
        
        // Conditionals
        private ConditionStartLeft: string;
        private ConditionStartRight: string;
        private ConditionContinueLeft: string;
        private ConditionContinueRight: string;
        private ConditionEnd: string;
        private Elif: string;
        private Else: string;
        private If: string;
        
        // Operators
        private And: string;
        private GreaterThan: string;
        private GreaterThanOrEqual: string;
        private LessThan: string;
        private LessThanOrEqual: string;
        private Or: string;
        
        // Variables
        private CastEnder: string;
        private CastStarter: string;
        private Undefined: string;
        private VariableTypesExplicit: boolean;
        private VariableTypesAfterName: boolean;
        private VariableTypeMarker: string;
        private VariableDeclareStart: string;
        
        // Booleans
        
        private BooleanClass: string;
        private True: string;
        private False: string;
        
        // Numbers
        private NumberClass: string;
        
        // Strings
        private StringClass: string;
        private StringLength: string;
        private ToString: string;
        private ToStringAsFunction: boolean;
        
        // Loops
        private Break: string;
        private Continue: string;
        private ForEachAsMethod: boolean;
        private ForEachInner: string;
        private ForEachKeysAsStatic: boolean;
        private ForEachKeysGet: string;
        private ForEachPairsGet: string;
        private ForEachPairsPairClass: string;
        private ForEachPairsAsPair: boolean;
        private ForEachPairsRetrieveKey: string;
        private ForEachPairsRetrieveValue: string;
        private ForEachStarter: string;
        private RangedForLoops: boolean;
        private RangedForLoopsStart: string;
        private RangedForLoopsMiddle: string;
        private RangedForLoopsEnd: string;
        
        // Arrays
        private ArrayClass: string;
        private ArrayInitializationAsNew: boolean;
        private ArrayInitializationAsNewMultiplied: boolean;
        private ArrayInitializationAsNewStatic: boolean;
        private ArrayInitializationAsNewTyped: boolean;
        private ArrayLength: string;
        private ArrayLengthAsFunction: boolean;
        private ArrayNegativeIndices: boolean;
        
        // Dictionaries
        private DictionaryClass: string;
        private DictionaryInitializationAsNew: boolean;
        private DictionaryInitializeEnder: string;
        private DictionaryInitializeKeyComma: string;
        private DictionaryInitializeKeyWithSemicolon: boolean;
        private DictionaryInitializeStarter: string;
        private DictionaryKeyCheckAsFunction: boolean;
        private DictionaryKeyChecker: string;
        private DictionaryKeyLeft: string;
        private DictionaryKeyMiddle: string;
        private DictionaryKeyRight: string;
        
        // Exceptions
        private ExceptionCatch: string;
        private ExceptionClass: string;
        private ExceptionErrorPrefix: string;
        private ExceptionFinally: string;
        private ExceptionThrow: string;
        private ExceptionTry: string;
        
        // Functions
        private FunctionDefine: string;
        private FunctionDefineRight: string;
        private FunctionDefineEnd: string;
        private FunctionReturnsExplicit: boolean;
        private FunctionTypeAfterName: boolean;
        private FunctionTypeMarker: string;
        
        // Lambdas
        private LambdaDeclareEnder: string;
        private LambdaDeclareMiddle: string;
        private LambdaDeclareStarter: string;
        private LambdaTypeDeclarationAsInterface: boolean;
        private LambdaTypeDeclarationRequired: boolean;
        private LambdaTypeDeclarationEnd: string[];
        private LambdaTypeDeclarationMiddle: string[];
        private LambdaTypeDeclarationStart: string[];
        
        // Classes
        private ClassConstructorAsStatic: boolean;
        private ClassConstructorInheritedShorthand: boolean;
        private ClassConstructorName: string;
        private ClassConstructorLoose: boolean;
        private ClassEnder: string;
        private ClassExtends: string;
        private ClassExtendsAsFunction: boolean;
        private ClassFunctionsStart: string;
        private ClassFunctionsThis: string;
        private ClassMemberFunctionGetEnd: string;
        private ClassMemberFunctionGetStart: string;
        private ClassMemberFunctionGetBind: boolean;
        private ClassFunctionsTakeThis: boolean;
        private ClassMemberVariableDefault: string;
        private ClassMemberVariablePrivacy: boolean;
        private ClassMemberVariableStarter: string;
        private ClassNewer: string;
        private ClassParentName: string;
        private ClassPrivacy: boolean;
        private ClassPublicAlias: string;
        private ClassStaticLabel: string;
        private ClassStaticFunctionDecorator: string;
        private ClassStaticFunctionRequiresDecorator: boolean;
        private ClassStartLeft: string;
        private ClassStartRight: string;
        private ClassTemplates: boolean;
        private ClassTemplatesBetween: string;
        private ClassThis: string;
        private ClassThisAccess: string;
        
        // File
        private FileEndLine: string;
        private FileStartLeft: string;
        private FileStartRight: string;
        private IncludeDictionaryType: string;
        private IncludeEnder: string;
        private IncludeFileExtension: boolean;
        private IncludeStarter: string;
        
        // Main
        private MainEndLine: string;
        private MainStartLine: string;
        
        // Extra
        public static INT_MIN: number = 9001;

        constructor() {
            this.Printers = {
                "array initialize": this.ArrayInitialize.bind(this),
                "array initialize sized": this.ArrayInitializeSized.bind(this),
                "array get item": this.ArrayGetItem.bind(this),
                "cast": this.Cast.bind(this),
                "catch": this.Catch.bind(this),
                "class constructor end": this.ClassConstructorEnd.bind(this),
                "class constructor inherited call": this.ClassConstructorInheritedCall.bind(this),
                "class constructor inherited start": this.ClassConstructorInheritedStart.bind(this),
                "class constructor start": this.ClassConstructorStart.bind(this),
                "class end": this.ClassEnd.bind(this),
                "class member function call": this.ClassMemberFunctionCall.bind(this),
                "class member function end": this.ClassMemberFunctionEnd.bind(this),
                "class member function get": this.ClassMemberFunctionGet.bind(this),
                "class member function start": this.ClassMemberFunctionStart.bind(this),
                "class member variable declare": this.ClassMemberVariableDeclare.bind(this),
                "class member variable get": this.ClassMemberVariableGet.bind(this),
                "class member variable set": this.ClassMemberVariableSet.bind(this),
                "class member variable set incomplete": this.ClassMemberVariableSetIncomplete.bind(this),
                "class static function call": this.ClassStaticFunctionCall.bind(this),
                "class static function end": this.ClassStaticFunctionEnd.bind(this),
                "class static function get": this.ClassStaticFunctionGet.bind(this),
                "class static function start": this.ClassStaticFunctionStart.bind(this),
                "class static variable declare": this.ClassStaticVariableDeclare.bind(this),
                "class static variable get": this.ClassStaticVariableGet.bind(this),
                "class static variable set": this.ClassStaticVariableSet.bind(this),
                "class new": this.ClassNew.bind(this),
                "class start": this.ClassStart.bind(this),
                "comment block": this.CommentBlock.bind(this),
                "comment line": this.CommentLine.bind(this),
                "comment inline": this.CommentInline.bind(this),
                "comparison": this.Comparison.bind(this),
                "concatenate": this.Concatenate.bind(this),
                "dictionary key check": this.DictionaryKeyCheck.bind(this),
                "dictionary key get": this.DictionaryKeyGet.bind(this),
                "dictionary key set": this.DictionaryKeySet.bind(this),
                "dictionary initialize": this.DictionaryInitialize.bind(this),
                "dictionary initialize end": this.DictionaryInitializeEnd.bind(this),
                "dictionary initialize key": this.DictionaryInitializeKey.bind(this),
                "dictionary initialize start": this.DictionaryInitializeStart.bind(this),
                "dictionary type": this.DictionaryType.bind(this),
                "elif start": this.ElifStart.bind(this),
                "else start": this.ElseStart.bind(this),
                "file end": this.FileEnd.bind(this),
                "file start": this.FileStart.bind(this),
                "finally": this.Finally.bind(this),
                "for each keys start": this.ForEachKeysStart.bind(this),
                "for each pairs start": this.ForEachPairsStart.bind(this),
                "for end": this.ForEnd.bind(this),
                "for numbers start": this.ForNumbersStart.bind(this),
                "function call": this.FunctionCall.bind(this),
                "function call partial end": this.FunctionCallPartialEnd.bind(this),
                "function call partial start": this.FunctionCallPartialStart.bind(this),
                "function end": this.FunctionEnd.bind(this),
                "function start": this.FunctionStart.bind(this),
                "if end": this.IfEnd.bind(this),
                "if start": this.IfStart.bind(this),
                "include": this.Include.bind(this),
                "include dictionary": this.IncludeDictionary.bind(this),
                "lambda declare inline": this.LambdaDeclareInline.bind(this),
                "lambda type declare": this.LambdaTypeDeclare.bind(this),
                "loop break": this.LoopBreak.bind(this),
                "loop continue": this.LoopContinue.bind(this),
                "main end": this.MainEnd.bind(this),
                "main start": this.MainStart.bind(this),
                "native call": this.NativeCall.bind(this),
                "not": this.Not.bind(this),
                "operation": this.Operation.bind(this),
                "parenthesis": this.Parenthesis.bind(this),
                "print line": this.PrintLine.bind(this),
                "return": this.Return.bind(this),
                "this": this.This.bind(this),
                "throw": this.Throw.bind(this),
                "try end": this.TryEnd.bind(this),
                "try start": this.TryStart.bind(this),
                "type": this.Type.bind(this),
                "value": this.Value.bind(this),
                "variable declare": this.VariableDeclare.bind(this),
                "variable declare incomplete": this.VariableDeclareIncomplete.bind(this),
                "variable declare partial": this.VariableDeclarePartial.bind(this),
                "while end": this.WhileEnd.bind(this),
                "while start": this.WhileStart.bind(this)
            };

            this.OperationAliases = {
                "equals": "=",
                "plus": "+",
                "minus": "-",
                "times": "*",
                "divide": "/",
                "increaseby": "+=",
                "decreaseby": "-=",
                "multiplyby": "*=",
                "divideby": "/=",
                "lessthan": "<",
                "greaterthan": ">",
                "lessthanequal": "<=",
                "greaterthanequal": ">=",
                "equalto": "==",
                "notequalto": "!=",
                "and": "&&",
                "or": "||",
                "mod": "%"
            };

            this.TypeAliases = {};

            this.ValueAliases = {};

            this.NativeFunctionAliases = {
                "array": {},
                "dictionary": {},
                "string": {},
            };
        }
        
        /*
        Gets
        */

        public getName(): string {
            return this.Name;
        }

        public getExtension(): string {
            return this.Extension;
        }

        public getPrintFunction(): string {
            return this.PrintFunction;
        }

        public getSemiColon(): string {
            return this.SemiColon;
        }

        public getCommentorBlockStart(): string {
            return this.CommentorBlockStart;
        }

        public getCommentorBlockEnd(): string {
            return this.CommentorBlockEnd;
        }

        public getCommentorInline(): string {
            return this.CommentorInline;
        }

        public getConditionStartLeft(): string {
            return this.ConditionStartLeft;
        }

        public getConditionStartRight(): string {
            return this.ConditionStartRight;
        }

        public getConditionContinueLeft(): string {
            return this.ConditionContinueLeft;
        }

        public getConditionContinueRight(): string {
            return this.ConditionContinueRight;
        }

        public getConditionEnd(): string {
            return this.ConditionEnd;
        }

        public getElif(): string {
            return this.Elif;
        }

        public getElse(): string {
            return this.Else;
        }

        public getIf(): string {
            return this.If;
        }

        public getAnd(): string {
            return this.And;
        }

        public getGreaterThan(): string {
            return this.GreaterThan;
        }

        public getGreaterThanOrEqual(): string {
            return this.GreaterThanOrEqual;
        }

        public getLessThan(): string {
            return this.LessThan;
        }

        public getLessThanOrEqual(): string {
            return this.LessThanOrEqual;
        }

        public getOr(): string {
            return this.Or;
        }

        public getCastEnder(): string {
            return this.CastEnder;
        }

        public getCastStarter(): string {
            return this.CastStarter;
        }

        public getUndefined(): string {
            return this.Undefined;
        }

        public getVariableTypesExplicit(): boolean {
            return this.VariableTypesExplicit;
        }

        public getVariableTypesAfterName(): boolean {
            return this.VariableTypesAfterName;
        }

        public getVariableTypeMarker(): string {
            return this.VariableTypeMarker;
        }

        public getVariableDeclareStart(): string {
            return this.VariableDeclareStart;
        }

        public getBooleanClass(): string {
            return this.BooleanClass;
        }

        public getTrue(): string {
            return this.True;
        }

        public getFalse(): string {
            return this.False;
        }

        public getNumberClass(): string {
            return this.NumberClass;
        }

        public getStringClass(): string {
            return this.StringClass;
        }

        public getStringLength(): string {
            return this.StringLength;
        }

        public getToString(): string {
            return this.ToString;
        }

        public getToStringAsFunction(): boolean {
            return this.ToStringAsFunction;
        }

        public getBreak(): string {
            return this.Break;
        }

        public getContinue(): string {
            return this.Continue;
        }

        public getForEachAsMethod(): boolean {
            return this.ForEachAsMethod;
        }

        public getForEachInner(): string {
            return this.ForEachInner;
        }

        public getForEachKeysAsStatic(): boolean {
            return this.ForEachKeysAsStatic;
        }

        public getForEachKeysGet(): string {
            return this.ForEachKeysGet;
        }

        public getForEachPairsGet(): string {
            return this.ForEachPairsGet;
        }

        public getForEachPairsPairClass(): string {
            return this.ForEachPairsPairClass;
        }

        public getForEachPairsAsPair(): boolean {
            return this.ForEachPairsAsPair;
        }

        public getForEachPairsRetrieveKey(): string {
            return this.ForEachPairsRetrieveKey;
        }

        public getForEachPairsRetrieveValue(): string {
            return this.ForEachPairsRetrieveValue;
        }

        public getForEachStarter(): string {
            return this.ForEachStarter;
        }

        public getRangedForLoops(): boolean {
            return this.RangedForLoops;
        }

        public getRangedForLoopsStart(): string {
            return this.RangedForLoopsStart;
        }

        public getRangedForLoopsMiddle(): string {
            return this.RangedForLoopsMiddle;
        }

        public getRangedForLoopsEnd(): string {
            return this.RangedForLoopsEnd;
        }

        public getArrayClass(): string {
            return this.ArrayClass;
        }

        public getArrayInitializationAsNew(): boolean {
            return this.ArrayInitializationAsNew;
        }

        public getArrayInitializationAsNewMultiplied(): boolean {
            return this.ArrayInitializationAsNewMultiplied;
        }

        public getArrayInitializationAsNewStatic(): boolean {
            return this.ArrayInitializationAsNewStatic;
        }

        public getArrayInitializationAsNewTyped(): boolean {
            return this.ArrayInitializationAsNewTyped;
        }

        public getArrayLength(): string {
            return this.ArrayLength;
        }

        public getArrayLengthAsFunction(): boolean {
            return this.ArrayLengthAsFunction;
        }

        public getArrayNegativeIndices(): boolean {
            return this.ArrayNegativeIndices;
        }

        public getDictionaryClass(): string {
            return this.DictionaryClass;
        }

        public getDictionaryInitializationAsNew(): boolean {
            return this.DictionaryInitializationAsNew;
        }

        public getDictionaryInitializeStarter(): string {
            return this.DictionaryInitializeStarter;
        }

        public getDictionaryInitializeEnder(): string {
            return this.DictionaryInitializeEnder;
        }

        public getDictionaryInitializeKeyComma(): string {
            return this.DictionaryInitializeKeyComma;
        }

        public getDictionaryInitializeKeyWithSemicolon(): boolean {
            return this.DictionaryInitializeKeyWithSemicolon;
        }

        public getDictionaryKeyCheckAsFunction(): boolean {
            return this.DictionaryKeyCheckAsFunction;
        }

        public getDictionaryKeyChecker(): string {
            return this.DictionaryKeyChecker;
        }

        public getDictionaryKeyLeft(): string {
            return this.DictionaryKeyLeft;
        }

        public getDictionaryKeyMiddle(): string {
            return this.DictionaryKeyMiddle;
        }

        public getDictionaryKeyRight(): string {
            return this.DictionaryKeyRight;
        }

        public getExceptionCatch(): string {
            return this.ExceptionCatch;
        }

        public getExceptionClass(): string {
            return this.ExceptionClass;
        }

        public getExceptionErrorPrefix(): string {
            return this.ExceptionErrorPrefix;
        }

        public getExceptionFinally(): string {
            return this.ExceptionFinally;
        }

        public getExceptionThrow(): string {
            return this.ExceptionThrow;
        }

        public getExceptionTry(): string {
            return this.ExceptionTry;
        }

        public getFunctionDefine(): string {
            return this.FunctionDefine;
        }

        public getFunctionDefineRight(): string {
            return this.FunctionDefineRight;
        }

        public getFunctionDefineEnd(): string {
            return this.FunctionDefineEnd;
        }

        public getFunctionReturnsExplicit(): boolean {
            return this.FunctionReturnsExplicit;
        }

        public getFunctionTypeAfterName(): boolean {
            return this.FunctionTypeAfterName;
        }

        public getFunctionTypeMarker(): string {
            return this.FunctionTypeMarker;
        }

        public getLambdaDeclareEnder(): string {
            return this.LambdaDeclareEnder;
        }

        public getLambdaDeclareMiddle(): string {
            return this.LambdaDeclareMiddle;
        }

        public getLambdaDeclareStarter(): string {
            return this.LambdaDeclareStarter;
        }

        public getLambdaTypeDeclarationAsInterface(): boolean {
            return this.LambdaTypeDeclarationAsInterface;
        }

        public getLambdaTypeDeclarationRequired(): boolean {
            return this.LambdaTypeDeclarationRequired;
        }

        public getLambdaTypeDeclarationEnd(): string[] {
            return this.LambdaTypeDeclarationEnd;
        }

        public getLambdaTypeDeclarationMiddle(): string[] {
            return this.LambdaTypeDeclarationMiddle;
        }

        public getLambdaTypeDeclarationStart(): string[] {
            return this.LambdaTypeDeclarationStart;
        }

        public getClassConstructorAsStatic(): boolean {
            return this.ClassConstructorAsStatic;
        }

        public getClassConstructorInheritedShorthand(): boolean {
            return this.ClassConstructorInheritedShorthand;
        }

        public getClassConstructorName(): string {
            return this.ClassConstructorName;
        }

        public getClassConstructorLoose(): boolean {
            return this.ClassConstructorLoose;
        }

        public getClassEnder(): string {
            return this.ClassEnder;
        }

        public getClassExtends(): string {
            return this.ClassExtends;
        }

        public getClassExtendsAsFunction(): boolean {
            return this.ClassExtendsAsFunction;
        }

        public getClassFunctionsTakeThis(): boolean {
            return this.ClassFunctionsTakeThis;
        }

        public getClassFunctionsStart(): string {
            return this.ClassFunctionsStart;
        }

        public getClassFunctionsThis(): string {
            return this.ClassFunctionsThis;
        }

        public getClassMemberFunctionGetBind(): boolean {
            return this.ClassMemberFunctionGetBind;
        }

        public getClassMemberFunctionGetEnd(): string {
            return this.ClassMemberFunctionGetEnd;
        }

        public getClassMemberFunctionGetStart(): string {
            return this.ClassMemberFunctionGetStart;
        }

        public getClassMemberVariableDefault(): string {
            return this.ClassMemberVariableDefault;
        }

        public getClassMemberVariablePrivacy(): boolean {
            return this.ClassMemberVariablePrivacy;
        }

        public getClassMemberVariableStarter(): string {
            return this.ClassMemberVariableStarter;
        }

        public getClassNewer(): string {
            return this.ClassNewer;
        }

        public getClassParentName(): string {
            return this.ClassParentName;
        }

        public getClassPrivacy(): boolean {
            return this.ClassPrivacy;
        }

        public getClassPublicAlias(): string {
            return this.ClassPublicAlias;
        }

        public getClassStaticLabel(): string {
            return this.ClassStaticLabel;
        }

        public getClassStaticFunctionDecorator(): string {
            return this.ClassStaticFunctionDecorator;
        }

        public getClassStaticFunctionRequiresDecorator(): boolean {
            return this.ClassStaticFunctionRequiresDecorator;
        }

        public getClassStartLeft(): string {
            return this.ClassStartLeft;
        }

        public getClassStartRight(): string {
            return this.ClassStartRight;
        }

        public getClassTemplates(): boolean {
            return this.ClassTemplates;
        }

        public getClassTemplatesBetween(): string {
            return this.ClassTemplatesBetween;
        }

        public getClassThis(): string {
            return this.ClassThis;
        }

        public getClassThisAccess(): string {
            return this.ClassThisAccess;
        }

        public getFileEndLine(): string {
            return this.FileEndLine;
        }

        public getFileStartLeft(): string {
            return this.FileStartLeft;
        }

        public getFileStartRight(): string {
            return this.FileStartRight;
        }

        public getIncludeDictionaryType(): string {
            return this.IncludeDictionaryType;
        }

        public getIncludeEnder(): string {
            return this.IncludeEnder;
        }

        public getIncludeFileExtension(): boolean {
            return this.IncludeFileExtension;
        }

        public getIncludeStarter(): string {
            return this.IncludeStarter;
        }

        public getMainEndLine(): string {
            return this.MainEndLine;
        }

        public getMainStartLine(): string {
            return this.MainStartLine;
        }
        
        
        /*
        Sets
        */

        public setName(value: string): Language {
            this.Name = value;
            return this;
        }

        public setExtension(value: string): Language {
            this.Extension = value;
            return this;
        }

        public setPrintFunction(value: string): Language {
            this.PrintFunction = value;
            return this;
        }

        public setSemiColon(value: string): Language {
            this.SemiColon = value;
            return this;
        }

        public setCommentorBlockStart(value: string): Language {
            this.CommentorBlockStart = value;
            return this;
        }

        public setCommentorBlockEnd(value: string): Language {
            this.CommentorBlockEnd = value;
            return this;
        }

        public setCommentorInline(value: string): Language {
            this.CommentorInline = value;
            return this;
        }

        public setConditionStartLeft(value: string): Language {
            this.ConditionStartLeft = value;
            return this;
        }

        public setConditionStartRight(value: string): Language {
            this.ConditionStartRight = value;
            return this;
        }

        public setConditionContinueLeft(value: string): Language {
            this.ConditionContinueLeft = value;
            return this;
        }

        public setConditionContinueRight(value: string): Language {
            this.ConditionContinueRight = value;
            return this;
        }

        public setConditionEnd(value: string): Language {
            this.ConditionEnd = value;
            return this;
        }

        public setElif(value: string): Language {
            this.Elif = value;
            return this;
        }

        public setElse(value: string): Language {
            this.Else = value;
            return this;
        }

        public setIf(value: string): Language {
            this.If = value;
            return this;
        }

        public setAnd(value: string): Language {
            this.And = value;
            return this;
        }

        public setGreaterThan(value: string): Language {
            this.GreaterThan = value;
            return this;
        }

        public setGreaterThanOrEqual(value: string): Language {
            this.GreaterThanOrEqual = value;
            return this;
        }

        public setLessThan(value: string): Language {
            this.LessThan = value;
            return this;
        }

        public setLessThanOrEqual(value: string): Language {
            this.LessThanOrEqual = value;
            return this;
        }

        public setOr(value: string): Language {
            this.Or = value;
            return this;
        }

        public setCastEnder(value: string): Language {
            this.CastEnder = value;
            return this;
        }

        public setCastStarter(value: string): Language {
            this.CastStarter = value;
            return this;
        }

        public setUndefined(value: string): Language {
            this.Undefined = value;
            return this;
        }

        public setVariableTypesExplicit(value: boolean): Language {
            this.VariableTypesExplicit = value;
            return this;
        }

        public setVariableTypesAfterName(value: boolean): Language {
            this.VariableTypesAfterName = value;
            return this;
        }

        public setVariableTypeMarker(value: string): Language {
            this.VariableTypeMarker = value;
            return this;
        }

        public setVariableDeclareStart(value: string): Language {
            this.VariableDeclareStart = value;
            return this;
        }

        public setBooleanClass(value: string): Language {
            this.BooleanClass = value;
            return this;
        }

        public setTrue(value: string): Language {
            this.True = value;
            return this;
        }

        public setFalse(value: string): Language {
            this.False = value;
            return this;
        }

        public setNumberClass(value: string): Language {
            this.NumberClass = value;
            return this;
        }

        public setStringClass(value: string): Language {
            this.StringClass = value;
            return this;
        }

        public setStringLength(value: string): Language {
            this.StringLength = value;
            return this;
        }

        public setBreak(value: string): Language {
            this.Break = value;
            return this;
        }

        public setContinue(value: string): Language {
            this.Continue = value;
            return this;
        }

        public setForEachAsMethod(value: boolean): Language {
            this.ForEachAsMethod = value;
            return this;
        }

        public setForEachInner(value: string): Language {
            this.ForEachInner = value;
            return this;
        }

        public setForEachKeysAsStatic(value: boolean): Language {
            this.ForEachKeysAsStatic = value;
            return this;
        }

        public setForEachKeysGet(value: string): Language {
            this.ForEachKeysGet = value;
            return this;
        }

        public setForEachPairsGet(value: string): Language {
            this.ForEachPairsGet = value;
            return this;
        }

        public setForEachPairsPairClass(value: string): Language {
            this.ForEachPairsPairClass = value;
            return this;
        }

        public setForEachPairsAsPair(value: boolean): Language {
            this.ForEachPairsAsPair = value;
            return this;
        }

        public setForEachPairsRetrieveKey(value: string): Language {
            this.ForEachPairsRetrieveKey = value;
            return this;
        }

        public setForEachPairsRetrieveValue(value: string): Language {
            this.ForEachPairsRetrieveValue = value;
            return this;
        }

        public setForEachStarter(value: string): Language {
            this.ForEachStarter = value;
            return this;
        }

        public setRangedForLoops(value: boolean): Language {
            this.RangedForLoops = value;
            return this;
        }

        public setRangedForLoopsStart(value: string): Language {
            this.RangedForLoopsStart = value;
            return this;
        }

        public setRangedForLoopsMiddle(value: string): Language {
            this.RangedForLoopsMiddle = value;
            return this;
        }

        public setRangedForLoopsEnd(value: string): Language {
            this.RangedForLoopsEnd = value;
            return this;
        }

        public setToString(value: string): Language {
            this.ToString = value;
            return this;
        }

        public setToStringAsFunction(value: boolean): Language {
            this.ToStringAsFunction = value;
            return this;
        }

        public setArrayClass(value: string): Language {
            this.ArrayClass = value;
            return this;
        }

        public setArrayInitializationAsNew(value: boolean): Language {
            this.ArrayInitializationAsNew = value;
            return this;
        }

        public setArrayInitializationAsNewMultiplied(value: boolean): Language {
            this.ArrayInitializationAsNewMultiplied = value;
            return this;
        }

        public setArrayInitializationAsNewTyped(value: boolean): Language {
            this.ArrayInitializationAsNewTyped = value;
            return this;
        }

        public setArrayInitializationAsNewStatic(value: boolean): Language {
            this.ArrayInitializationAsNewStatic = value;
            return this;
        }

        public setArrayLength(value: string): Language {
            this.ArrayLength = value;
            return this;
        }

        public setArrayLengthAsFunction(value: boolean): Language {
            this.ArrayLengthAsFunction = value;
            return this;
        }

        public setArrayNegativeIndices(value: boolean): Language {
            this.ArrayNegativeIndices = value;
            return this;
        }

        public setExceptionCatch(value: string): Language {
            this.ExceptionCatch = value;
            return this;
        }

        public setExceptionClass(value: string): Language {
            this.ExceptionClass = value;
            return this;
        }

        public setExceptionErrorPrefix(value: string): Language {
            this.ExceptionErrorPrefix = value;
            return this;
        }

        public setExceptionFinally(value: string): Language {
            this.ExceptionFinally = value;
            return this;
        }

        public setExceptionThrow(value: string): Language {
            this.ExceptionThrow = value;
            return this;
        }

        public setExceptionTry(value: string): Language {
            this.ExceptionTry = value;
            return this;
        }

        public setFunctionDefine(value: string): Language {
            this.FunctionDefine = value;
            return this;
        }

        public setFunctionDefineRight(value: string): Language {
            this.FunctionDefineRight = value;
            return this;
        }

        public setFunctionDefineEnd(value: string): Language {
            this.FunctionDefineEnd = value;
            return this;
        }

        public setFunctionReturnsExplicit(value: boolean): Language {
            this.FunctionReturnsExplicit = value;
            return this;
        }

        public setFunctionTypeAfterName(value: boolean): Language {
            this.FunctionTypeAfterName = value;
            return this;
        }

        public setFunctionTypeMarker(value: string): Language {
            this.FunctionTypeMarker = value;
            return this;
        }

        public setLambdaDeclareEnder(value: string): Language {
            this.LambdaDeclareEnder = value;
            return this;
        }

        public setLambdaDeclareMiddle(value: string): Language {
            this.LambdaDeclareMiddle = value;
            return this;
        }

        public setLambdaDeclareStarter(value: string): Language {
            this.LambdaDeclareStarter = value;
            return this;
        }

        public setLambdaTypeDeclarationAsInterface(value: boolean): Language {
            this.LambdaTypeDeclarationAsInterface = value;
            return this;
        }

        public setLambdaTypeDeclarationRequired(value: boolean): Language {
            this.LambdaTypeDeclarationRequired = value;
            return this;
        }

        public setLambdaTypeDeclarationEnd(value: string[]): Language {
            this.LambdaTypeDeclarationEnd = value;
            return this;
        }

        public setLambdaTypeDeclarationMiddle(value: string[]): Language {
            this.LambdaTypeDeclarationMiddle = value;
            return this;
        }

        public setLambdaTypeDeclarationStart(value: string[]): Language {
            this.LambdaTypeDeclarationStart = value;
            return this;
        }

        public setDictionaryClass(value: string): Language {
            this.DictionaryClass = value;
            return this;
        }

        public setDictionaryKeyCheckAsFunction(value: boolean): Language {
            this.DictionaryKeyCheckAsFunction = value;
            return this;
        }

        public setDictionaryKeyChecker(value: string): Language {
            this.DictionaryKeyChecker = value;
            return this;
        }

        public setDictionaryKeyLeft(value: string): Language {
            this.DictionaryKeyLeft = value;
            return this;
        }

        public setDictionaryKeyMiddle(value: string): Language {
            this.DictionaryKeyMiddle = value;
            return this;
        }

        public setDictionaryKeyRight(value: string): Language {
            this.DictionaryKeyRight = value;
            return this;
        }

        public setDictionaryInitializationAsNew(value: boolean): Language {
            this.DictionaryInitializationAsNew = value;
            return this;
        }

        public setDictionaryInitializeStarter(value: string): Language {
            this.DictionaryInitializeStarter = value;
            return this;
        }

        public setDictionaryInitializeEnder(value: string): Language {
            this.DictionaryInitializeEnder = value;
            return this;
        }

        public setDictionaryInitializeKeyComma(value: string): Language {
            this.DictionaryInitializeKeyComma = value;
            return this;
        }

        public setDictionaryInitializeKeyWithSemicolon(value: boolean): Language {
            this.DictionaryInitializeKeyWithSemicolon = value;
            return this;
        }

        public setClassConstructorAsStatic(value: boolean): Language {
            this.ClassConstructorAsStatic = value;
            return this;
        }

        public setClassConstructorInheritedShorthand(value: boolean): Language {
            this.ClassConstructorInheritedShorthand = value;
            return this;
        }

        public setClassConstructorName(value: string): Language {
            this.ClassConstructorName = value;
            return this;
        }

        public setClassConstructorLoose(value: boolean): Language {
            this.ClassConstructorLoose = value;
            return this;
        }

        public setClassEnder(value: string): Language {
            this.ClassEnder = value;
            return this;
        }

        public setClassExtends(value: string): Language {
            this.ClassExtends = value;
            return this;
        }

        public setClassExtendsAsFunction(value: boolean): Language {
            this.ClassExtendsAsFunction = value;
            return this;
        }

        public setClassFunctionsTakeThis(value: boolean): Language {
            this.ClassFunctionsTakeThis = value;
            return this;
        }

        public setClassFunctionsStart(value: string): Language {
            this.ClassFunctionsStart = value;
            return this;
        }

        public setClassFunctionsThis(value: string): Language {
            this.ClassFunctionsThis = value;
            return this;
        }

        public setClassMemberFunctionGetBind(value: boolean): Language {
            this.ClassMemberFunctionGetBind = value;
            return this;
        }

        public setClassMemberFunctionGetEnd(value: string): Language {
            this.ClassMemberFunctionGetEnd = value;
            return this;
        }

        public setClassMemberFunctionGetStart(value: string): Language {
            this.ClassMemberFunctionGetStart = value;
            return this;
        }

        public setClassMemberVariableDefault(value: string): Language {
            this.ClassMemberVariableDefault = value;
            return this;
        }

        public setClassMemberVariablePrivacy(value: boolean): Language {
            this.ClassMemberVariablePrivacy = value;
            return this;
        }

        public setClassMemberVariableStarter(value: string): Language {
            this.ClassMemberVariableStarter = value;
            return this;
        }

        public setClassNewer(value: string): Language {
            this.ClassNewer = value;
            return this;
        }

        public setClassParentName(value: string): Language {
            this.ClassParentName = value;
            return this;
        }

        public setClassPrivacy(value: boolean): Language {
            this.ClassPrivacy = value;
            return this;
        }

        public setClassPublicAlias(value: string): Language {
            this.ClassPublicAlias = value;
            return this;
        }

        public setClassStaticLabel(value: string): Language {
            this.ClassStaticLabel = value;
            return this;
        }

        public setClassStaticFunctionDecorator(value: string): Language {
            this.ClassStaticFunctionDecorator = value;
            return this;
        }

        public setClassStaticFunctionRequiresDecorator(value: boolean): Language {
            this.ClassStaticFunctionRequiresDecorator = value;
            return this;
        }

        public setClassStartLeft(value: string): Language {
            this.ClassStartLeft = value;
            return this;
        }

        public setClassStartRight(value: string): Language {
            this.ClassStartRight = value;
            return this;
        }

        public setClassTemplates(value: boolean): Language {
            this.ClassTemplates = value;
            return this;
        }

        public setClassTemplatesBetween(value: string): Language {
            this.ClassTemplatesBetween = value;
            return this;
        }

        public setClassThis(value: string): Language {
            this.ClassThis = value;
            return this;
        }

        public setClassThisAccess(value: string): Language {
            this.ClassThisAccess = value;
            return this;
        }

        public setFileEndLine(value: string): Language {
            this.FileEndLine = value;
            return this;
        }

        public setFileStartLeft(value: string): Language {
            this.FileStartLeft = value;
            return this;
        }

        public setFileStartRight(value: string): Language {
            this.FileStartRight = value;
            return this;
        }

        public setIncludeDictionaryType(value: string): Language {
            this.IncludeDictionaryType = value;
            return this;
        }

        public setIncludeEnder(value: string): Language {
            this.IncludeEnder = value;
            return this;
        }

        public setIncludeFileExtension(value: boolean): Language {
            this.IncludeFileExtension = value;
            return this;
        }

        public setIncludeStarter(value: string): Language {
            this.IncludeStarter = value;
            return this;
        }

        public setMainEndLine(value: string): Language {
            this.MainEndLine = value;
            return this;
        }

        public setMainStartLine(value: string): Language {
            this.MainStartLine = value;
            return this;
        }
        
        
        /*
        Array & Template parsing
        */

        public parseType(text: string): string {
            if (this.typeContainsArray(text)) {
                return this.parseTypeWithArray(text);
            }

            if (this.typeContainsTemplate(text)) {
                return this.parseTypeWithTemplate(text);
            }

            return this.getTypeAlias(text);
        }

        public typeContainsArray(text: string): boolean {
            return text.indexOf("[") != -1;
        }

        public typeContainsTemplate(text: string): boolean {
            return text.indexOf("<") != -1;
        }

        public parseTypeWithArray(text: string): string {
            var bracketIndex: number = text.indexOf("[");
            var name: string = text.substring(0, bracketIndex);
            var remainder: string = text.substring(bracketIndex);

            return this.parseType(name) + remainder;
        }

        public parseTypeWithTemplate(text: string): string {
            if (text.indexOf('>') == -1) {
                return text;
            }

            var ltIndex: number = text.indexOf("<");
            var output: string = text.substring(0, ltIndex);

            if (!this.getClassTemplates()) {
                return output;
            }

            var typeCheck: string = ' ';
            var typeStart: number = ltIndex;
            var typeEnd: number;

            while (typeStart < text.length) {
                for (typeEnd = typeStart; typeEnd < text.length; typeEnd += 1) {
                    typeCheck = text[typeEnd];
                    if (typeCheck == ',' || typeCheck == '<' || typeCheck == '>' || typeCheck == ' ') {
                        break;
                    }
                }

                if (typeEnd == text.length) {
                    break;
                }

                if (typeStart == typeEnd) {
                    output += typeCheck;
                    typeStart += 1;
                    continue;
                }

                output += this.parseType(text.substring(typeStart, typeEnd));
                output += typeCheck;

                typeStart = typeEnd + 1;
            }

            return output;
        }
        
        
        /*
        Miscellaneous
        */

        public getAliasOrDefault(aliases: any, key: string): string {
            if (aliases.hasOwnProperty(key)) {
                return aliases[key];
            } else {
                return key;
            }
        }

        public getTypeAlias(key: string): string {
            return this.getAliasOrDefault(this.TypeAliases, key);
        }

        public getOperationAlias(key: string): string {
            return this.getAliasOrDefault(this.OperationAliases, key);
        }

        public getValueAlias(key: string): string {
            return this.getAliasOrDefault(this.ValueAliases, key);
        }

        public addTypeAlias(key: string, alias: string): Language {
            this.TypeAliases[key] = alias;
            return this;
        }

        public addTypeAliases(aliases: any): Language {
            var key: string;
            var alias: string;
            for (key in aliases) {
                alias = aliases[key];
                this.addTypeAlias(key, aliases[key]);
            }

            return this;
        }

        public addOperationAlias(key: string, alias: string): Language {
            this.OperationAliases[key] = alias;
            return this;
        }

        public addOperationAliases(aliases: any): Language {
            var key: string;
            var alias: string;
            for (key in aliases) {
                alias = aliases[key];
                this.addOperationAlias(key, aliases[key]);
            }

            return this;
        }

        public addValueAlias(key: string, alias: string): Language {
            this.ValueAliases[key] = alias;
            return this;
        }

        public addValueAliases(aliases: any): Language {
            var key: string;
            var alias: string;
            for (key in aliases) {
                alias = aliases[key];
                this.addValueAlias(key, aliases[key]);
            }

            return this;
        }

        public getNativeFunctionAlias(className: string, memberName: string): any {
            return this.NativeFunctionAliases[className][memberName];
        }

        public addNativeFunctionAlias(className: string, memberName: string, aliasInfo: any): Language {
            this.NativeFunctionAliases[className][memberName] = aliasInfo;
            return this;
        }

        public addNativeFunctionAliases(className: string, aliasInfos: any): Language {
            var key: string;
            var alias: any;
            for (key in aliasInfos) {
                alias = aliasInfos[key];
                this.addNativeFunctionAlias(className, key, alias);
            }

            return this;
        }

        public print(functionName: string, functionArgs: string[], isInline: boolean): any[] {
            if (!this.Printers.hasOwnProperty(functionName)) {
                throw new Error("Function not found: " + functionName);
            }

            return this.Printers[functionName](functionArgs, isInline);
        }
        
        
        /*
        Printers
        */
        
        // string type[, string key, ...]
        public ArrayInitialize(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ArrayInitialize", functionArgs, 1);

            var arrayType: string = this.parseType(functionArgs[0]);
            var output: string;
            var i: number;

            if (this.getArrayInitializationAsNewTyped()) {
                output = "new " + arrayType + "[] { ";
            } else {
                output = "[";
            }

            if (functionArgs.length > 1) {
                for (i = 1; i < functionArgs.length - 1; i += 1) {
                    output += functionArgs[i] + ", ";
                }

                output += functionArgs[i];
            }

            if (this.getArrayInitializationAsNewTyped()) {
                output += " }";
            } else {
                output += "]";
            }

            return [output, 0];
        }
        
        // string type, string size
        public ArrayInitializeSized(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ArrayInitialize", functionArgs, 2);

            var arrayType: string = this.parseType(functionArgs[0]);
            var arraySize: string = functionArgs[1];
            var output: string;

            if (this.getArrayInitializationAsNewMultiplied()) {
                output = "[" + this.getUndefined() + "]";
                return this.Operation([output, "times", arraySize], isInline);
            }

            if (this.getArrayInitializationAsNewStatic()) {
                output = this.getArrayClass() + ".new";
            } else {
                output = "new ";
            }

            if (this.getArrayInitializationAsNewTyped()) {
                output += arrayType + "[" + arraySize + "]";
            } else {
                if (!this.getArrayInitializationAsNewStatic()) {
                    output += this.getArrayClass();
                }
                output += "(" + arraySize + ")";
            }

            return [output, 0];
        }
        
        // string name, string index
        public ArrayGetItem(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ArrayGetItem", functionArgs, 1);

            var name: string = functionArgs[0];
            var output: string = name + "[";
            var index: string = functionArgs[1];

            if (index[0] != '-' || this.getArrayNegativeIndices()) {
                output += index;
            } else {
                var nativePart: string = <string>this.NativeCall(["array", "length", name], true)[0];
                output += this.Operation([nativePart, "minus", "1"], true)[0];
            }

            output += "]";
            return [output, 0];
        }
        
        // string type, string value
        public Cast(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("Cast", functionArgs, 2);

            if (!this.getVariableTypesExplicit()) {
                return [functionArgs[1], 0];
            }

            var output: string = this.getCastStarter();
            output += this.parseType(functionArgs[0]);
            output += this.getCastEnder();
            output += functionArgs[1];

            return [output, 0];
        }
        
        // [string name]
        public Catch(functionArgs: string[], isInline: boolean): any[] {
            var output: string = this.getExceptionCatch() + this.getExceptionClass();

            if (functionArgs.length > 0) {
                output += this.getExceptionErrorPrefix() + functionArgs[0];
            }

            output += this.getConditionStartRight();

            return ["\0", -1, output, 1];
        }

        public ClassConstructorEnd(functionArgs: string[], isInline: boolean): any[] {
            return [this.getFunctionDefineEnd(), -1];
        }
        
        // string super, [string argumentName, string argumentType, ...]
        public ClassConstructorInheritedCall(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassConstructorInheritedCall", functionArgs, 1);

            var parentName: string = this.getClassParentName();
            var callingArgsLength: number = functionArgs.length;
            var loopStart: number = 0;
            var callingArgs: string[];
            var i: number;
            
            // Blank parentName indicates the super's class name should be used
            if (parentName.length == 0) {
                parentName = this.parseType(functionArgs[0]);
            }
            
            // Taking a reference to `this` as a paremeter increases the number of parameters
            if (this.getClassFunctionsTakeThis()) {
                callingArgsLength += 1;
                loopStart += 1;
            }

            callingArgs = new Array(callingArgsLength);
            callingArgs[0] = parentName;

            if (this.getClassExtendsAsFunction()) {
                callingArgs[0] += "." + this.getClassConstructorName();
            }

            if (this.getClassFunctionsTakeThis()) {
                callingArgs[1] = this.getClassThis();
            }

            for (i = loopStart; i < functionArgs.length; i += 1) {
                callingArgs[i + 1] = functionArgs[i];
            }

            return this.FunctionCall(callingArgs, isInline);
        }
        
        // string name[, string superCall[, string argumentName, string argumentType, ...]]
        public ClassConstructorInheritedStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassConstructorInheritedStart", functionArgs, 1);

            if (functionArgs.length == 1) {
                return this.ClassConstructorStart(functionArgs, isInline);
            }

            var generalCall: any[];
            var callingArgs: string[];
            var output: any[];
            var i: number;
            
            // Populate the arguments that will be passed to the actual method
            if (functionArgs.length > 2) {
                callingArgs = new Array(functionArgs.length - 1);

                for (i = 2; i < functionArgs.length; i += 1) {
                    callingArgs[i - 1] = functionArgs[i];
                }

                callingArgs[0] = functionArgs[0];
            } else {
                callingArgs = [functionArgs[0]];
            }

            generalCall = this.ClassConstructorStart(callingArgs, isInline);

            if (this.getClassConstructorInheritedShorthand()) {
                // "Shorthand" usage, like in C#, comes before FunctionDefineRight
                output = new Array(generalCall.length);
                output[0] = (<string>generalCall[0]).substring(0,(<string>generalCall[0]).length - this.getFunctionDefineRight().length);
                output[0] += functionArgs[1] + this.getFunctionDefineRight();

                for (i = 1; i < generalCall.length; i += 1) {
                    output[i] = generalCall[i];
                }
            } else {
                // In-function usage, like in Python, comes within the function
                output = new Array(generalCall.length + 2);
                output[output.length - 1] = 0;
                output[output.length - 2] = functionArgs[1];
                output[generalCall.length - 1] = generalCall[generalCall.length - 1];

                if (!isInline) {
                    output[output.length - 2] += this.getSemiColon();
                }

                for (i = 0; i < generalCall.length - 1; i += 1) {
                    output[i] = generalCall[i];
                }
            }

            return output;
        }
        
        // string name[, string argumentName, string argumentType, ...]
        public ClassConstructorStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassConstructorStart", functionArgs, 1);

            var output: string = this.getClassConstructorName();
            var variableDeclarationArgs: string[] = [];
            var i: number;

            if (this.getClassConstructorLoose()) {
                output = this.getClassFunctionsStart() + output;
            }

            if (output.length == 0) {
                output = functionArgs[0];
            }

            output += "(";
            
            // Languages like Python take a "self" or "this" equivalent first
            if (this.getClassFunctionsTakeThis()) {
                if (this.getClassFunctionsTakeThis()) {
                    output += ", ";
                }

                for (i = 1; i < functionArgs.length; i += 2) {
                    variableDeclarationArgs[0] = functionArgs[i];
                    variableDeclarationArgs[1] = functionArgs[i];

                    output += this.VariableDeclarePartial(variableDeclarationArgs, true)[0] + ", ";
                }
                
                // The last argument does not have the last ", " at the end
                output = output.substring(0, output.length - 2);
            }

            output += ")" + this.getFunctionDefineRight();
            return [output, 1];
        }

        public ClassEnd(functionArgs: string[], isInline: boolean): any[] {
            return [this.getClassEnder(), -1];
        }
        
        // string variable, string function[, string argumentName, ...]
        public ClassMemberFunctionCall(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassMemberFunctionCall", functionArgs, 2);

            var output: string = functionArgs[0] + "." + functionArgs[1] + "(";
            var i: number;

            if (functionArgs.length > 2) {
                for (i = 2; i < functionArgs.length - 1; i += 1) {
                    output += functionArgs[i] + ", ";
                }
                output += functionArgs[i];
            }

            output += ")";

            if (!isInline) {
                output += this.getSemiColon();
            }

            return [output, 0];
        }

        public ClassMemberFunctionEnd(functionArgs: string[], isInline: boolean): any[] {
            return [this.getFunctionDefineEnd(), -1];
        }
        
        // string variable, string function
        public ClassMemberFunctionGet(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassMemberFunctionStart", functionArgs, 2);

            var output: string = "";

            output += this.getClassMemberFunctionGetStart() + functionArgs[0];
            output += "." + functionArgs[1] + this.getClassMemberFunctionGetEnd();

            if (this.getClassMemberFunctionGetBind()) {
                output += "(" + functionArgs[0] + ")";
            }

            return [output, 0];
        }
        
        // string class, string visibility, string name, string return[, string argumentName, string argumentType, ...]
        public ClassMemberFunctionStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassMemberFunctionStart", functionArgs, 4);

            var output: string = this.getClassFunctionsStart();
            var variableDeclarationArgs: string[] = [];
            var i: number;

            if (this.getFunctionReturnsExplicit() && !this.getFunctionTypeAfterName()) {
                output += this.parseType(functionArgs[3]) + " ";
            }

            if (this.getClassPrivacy()) {
                output = functionArgs[1] + " " + output;
            }

            output += functionArgs[2] + "(";

            if (this.getClassFunctionsTakeThis()) {
                variableDeclarationArgs[0] = this.getClassFunctionsThis();
                variableDeclarationArgs[1] = functionArgs[0];

                output += this.VariableDeclarePartial(variableDeclarationArgs, true)[0];
            }
            
            // All arguments are added using VariableDeclarePartial
            if (functionArgs.length > 4) {
                if (this.getClassFunctionsTakeThis()) {
                    output += ", ";
                }

                for (i = 4; i < functionArgs.length; i += 2) {
                    variableDeclarationArgs[0] = functionArgs[i];
                    variableDeclarationArgs[1] = functionArgs[i + 1];

                    output += this.VariableDeclarePartial(variableDeclarationArgs, true)[0] + ", ";
                }
                
                // The last argument does not have the last ", " at the end
                output = output.substring(0, output.length - 2);
            }

            output += ")";

            if (this.getFunctionReturnsExplicit() && this.getFunctionTypeAfterName()) {
                output += this.getFunctionTypeMarker() + this.parseType(functionArgs[3]);
            }

            output += this.getFunctionDefineRight();
            return [output, 1];
        }
        
        // string name, string visibility, string type
        public ClassMemberVariableDeclare(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassMemberVariableDeclare", functionArgs, 3);

            var variableType: string = this.parseType(functionArgs[2]);
            var variableDeclarationArgs: string[];
            var variableDeclared: any[];

            if (this.getClassMemberVariableDefault() != "") {
                variableDeclarationArgs = [functionArgs[0], variableType, this.getClassMemberVariableDefault()];
            } else {
                variableDeclarationArgs = [functionArgs[0], variableType];
            }

            variableDeclared = this.VariableDeclarePartial(variableDeclarationArgs, isInline);
            variableDeclared[1] = 0;

            if (!isInline) {
                variableDeclared[0] = variableDeclared[0] + this.getSemiColon();
            }

            if (this.getClassMemberVariablePrivacy()) {
                variableDeclared[0] = functionArgs[1] + " " + variableDeclared[0];
            }

            variableDeclared[0] = this.getClassMemberVariableStarter() + variableDeclared[0];

            return variableDeclared;
        }
        
        // string name, string variable
        public ClassMemberVariableGet(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassMemberVariableGet", functionArgs, 2);

            return [functionArgs[0] + this.getClassThisAccess() + functionArgs[1], 0];
        }
        
        // string variable, string name, string value
        public ClassMemberVariableSet(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassMemberVariableSet", functionArgs, 3);

            var output: any[] = this.ClassMemberVariableSetIncomplete(functionArgs, isInline);

            output[0] += this.getSemiColon();
            output[1] = 0;

            return output;
        }
        
        // string name, string variable, string value
        public ClassMemberVariableSetIncomplete(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassMemberVariableSetIncomplete", functionArgs, 3);

            var output: string = functionArgs[0] + this.getClassThisAccess();

            output += functionArgs[1] + " " + this.getOperationAlias("equals") + " " + functionArgs[2];

            return [output, 1];
        }
        
        // string class, string function[, string argumentName, ...]
        public ClassStaticFunctionCall(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassStaticFunctionCall", functionArgs, 2);

            var output: string = functionArgs[0] + "." + functionArgs[1] + "(";
            var i: number;

            if (functionArgs.length > 2) {
                for (i = 2; i < functionArgs.length - 1; i += 1) {
                    output += functionArgs[i] + ", ";
                }

                output += functionArgs[i];
            }

            output += ")";

            if (!isInline) {
                output += this.getSemiColon();
            }

            return [output, 0];
        }

        public ClassStaticFunctionEnd(functionArgs: string[], isInline: boolean): any[] {
            return [this.getFunctionDefineEnd(), -1];
        }
        
        // string class, string function
        public ClassStaticFunctionGet(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassStaticFunctionGet", functionArgs, 2);

            var output: string = "";

            output += this.getClassMemberFunctionGetStart() + functionArgs[0];
            output += "." + functionArgs[1] + this.getClassMemberFunctionGetEnd();

            if (this.getClassMemberFunctionGetBind()) {
                output += "(" + functionArgs[0] + ")";
            }

            return [output, 0];
        }
        
        // string class, string visibility, string name, string return[, string argumentName, string argumentType, ...]
        public ClassStaticFunctionStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassStaticFunctionStart", functionArgs, 4);

            var output: string = this.getClassFunctionsStart();
            var variableDeclarationArgs: string[] = [];
            var i: number;

            if (this.getFunctionReturnsExplicit() && !this.getFunctionTypeAfterName()) {
                output += this.parseType(functionArgs[3]) + " ";
            }

            output = this.getClassStaticLabel() + output;

            if (this.getClassPrivacy()) {
                output = functionArgs[1] + " " + output;
            }

            output += functionArgs[2] + "(";
            
            // All arguments are added using VariableDeclarePartial
            if (functionArgs.length > 4) {
                if (this.getClassFunctionsTakeThis()) {
                    output += ", ";
                }

                for (i = 4; i < functionArgs.length; i += 2) {
                    variableDeclarationArgs[0] = functionArgs[i];
                    variableDeclarationArgs[1] = functionArgs[i + 1];

                    output += this.VariableDeclarePartial(variableDeclarationArgs, true)[0] + ", ";
                }
                
                // The last argument does not have the last ", " at the end
                output = output.substring(0, output.length - 2);
            }

            output += ")";

            if (this.getFunctionReturnsExplicit() && this.getFunctionTypeAfterName()) {
                output += this.getFunctionTypeMarker() + this.parseType(functionArgs[3]);
            }

            if (this.getClassStaticFunctionRequiresDecorator()) {
                return [this.getClassStaticFunctionDecorator(), 0, output, 1];
            } else {
                return [output, 1];
            }
        }
        
        // string class, string visibility, string type[, string value]
        public ClassStaticVariableDeclare(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassStaticVariableDeclare", functionArgs, 3);

            var variableType: string = this.parseType(functionArgs[2]);
            var variableDeclarationArgs: string[];
            var variableDeclared: any[];

            if (functionArgs.length > 3) {
                variableDeclarationArgs = [functionArgs[0], variableType, functionArgs[3]];
            } else if (this.getClassMemberVariableDefault() != "") {
                variableDeclarationArgs = [functionArgs[0], variableType, this.getClassMemberVariableDefault()];
            } else {
                variableDeclarationArgs = [functionArgs[0], variableType];
            }

            variableDeclared = this.VariableDeclarePartial(variableDeclarationArgs, isInline);
            variableDeclared[0] = this.getClassStaticLabel() + variableDeclared[0];
            variableDeclared[1] = 0;

            if (!isInline) {
                variableDeclared[0] = variableDeclared[0] + this.getSemiColon();
            }

            if (this.getClassMemberVariablePrivacy()) {
                variableDeclared[0] = functionArgs[1] + " " + variableDeclared[0];
            }

            variableDeclared[0] = this.getClassMemberVariableStarter() + variableDeclared[0];

            return variableDeclared;
        }
        
        // string class, string name
        public ClassStaticVariableGet(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassStaticVariableGet", functionArgs, 2);

            return [functionArgs[0] + "." + functionArgs[1], 0];
        }
        
        // string class, string name, string value
        public ClassStaticVariableSet(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassStaticVariableSet", functionArgs, 3);

            var output: string = functionArgs[0] + "." + functionArgs[1] + " ";

            output += this.getOperationAlias("equals") + " " + functionArgs[2];
            output += this.getSemiColon();

            return [output, 0];
        }
        
        // string name[, string parentClass]
        public ClassStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassStart", functionArgs, 1);

            var output: string = this.getClassStartLeft();
            output += this.parseType(functionArgs[0]);

            if (functionArgs.length > 1) {
                if (this.getClassExtendsAsFunction()) {
                    output += "(" + this.parseType(functionArgs[1]) + ")";
                } else {
                    output += " " + this.getClassExtends() + " " + this.parseType(functionArgs[1]) + " ";
                }
            }

            output += this.getClassStartRight();

            if (this.getClassPrivacy()) {
                output = this.getClassPublicAlias() + output;
            }

            return [output, 1];
        }
        
        // string class[, string argumentName, string argumentType, ...]
        public ClassNew(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ClassNew", functionArgs, 1);

            var output: string;
            var i: number;

            if (this.getClassConstructorAsStatic()) {
                output = this.parseType(functionArgs[0]) + "." + this.getClassNewer() + "(";
            } else {
                output = this.getClassNewer() + this.parseType(functionArgs[0]) + "(";
            }

            if (functionArgs.length > 1) {
                for (i = 1; i < functionArgs.length; i += 1) {
                    output += functionArgs[i] + ", ";
                }
                
                // The last argument does not have the last ", " at the end
                output = output.substring(0, output.length - 2);
            }

            output += ")";

            if (!isInline) {
                output += this.getSemiColon();
            }

            return [output, 0];
        }
        
        // [string message, ...]
        public CommentBlock(functionArgs: string[], isInline: boolean): any[] {
            var output: any[] = new Array((functionArgs.length + 2) * 2);
            var i: number;

            output[0] = this.getCommentorBlockStart();
            output[1] = 0;

            for (i = 0; i < functionArgs.length; i += 1) {
                output[i * 1 + 2] = functionArgs[i];
                output[i * 2 + 3] = 0;
            }

            output[i * 2 + 2] = this.getCommentorBlockEnd();
            output[i * 2 + 3] = 0;

            return output;
        }
        
        // [string message, ...]
        public CommentLine(functionArgs: string[], isInline: boolean): any[] {
            var output: string = this.getCommentorInline() + " ";
            var i: number;

            for (i = 0; i < functionArgs.length - 1; i += 1) {
                output += functionArgs[i] + " ";
            }
            output += functionArgs[i];

            return [output, 0];
        }
        
        // [string message, ...]
        public CommentInline(functionArgs: string[], isInline: boolean): any[] {
            var result: any[] = this.CommentLine(functionArgs, isInline);

            result[1] = Language.INT_MIN;

            return result;
        }
        
        // string left, string comparison, string right
        public Comparison(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("Comparison", functionArgs, 3);

            return [functionArgs[0] + " " + this.getOperationAlias(functionArgs[1]) + " " + functionArgs[2], 0];
        }
        
        // string left, string right
        public Concatenate(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("Comparison", functionArgs, 2);

            var output: string;

            if (this.getToStringAsFunction()) {
                output = this.getToString() + "(" + functionArgs[0] + ")";
                output += " " + this.getOperationAlias("plus") + " ";
                output += this.getToString() + "(" + functionArgs[1] + ")";
            } else {
                output = functionArgs[0] + this.getToString();
                output += " " + this.getOperationAlias("plus") + " ";
                output += functionArgs[1] + this.getToString();
            }

            if (!isInline) {
                output += this.getSemiColon();
            }

            return [output, 0];
        }
        
        // string name, string key
        public DictionaryKeyCheck(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("DictionaryKeyCheck", functionArgs, 2);

            var output: string;

            if (this.getDictionaryKeyCheckAsFunction()) {
                output = functionArgs[0] + "." + this.getDictionaryKeyChecker() + "(" + functionArgs[1] + ")";
            } else {
                output = functionArgs[1] + this.getDictionaryKeyChecker() + functionArgs[0];
            }

            return [output, 0];
        }
        
        // string name, string key
        public DictionaryKeyGet(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("DictionaryKeyGet", functionArgs, 2);

            return [functionArgs[0] + "[" + functionArgs[1] + "]", 0];
        }
        
        // string name, string key, string value
        public DictionaryKeySet(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("DictionaryKeySet", functionArgs, 3);

            var output: string = functionArgs[0] + "[" + functionArgs[1] + "] = " + functionArgs[2];

            if (!isInline) {
                output += this.getSemiColon();
            }

            return [output, 0];
        }
        
        // string key, string value
        public DictionaryInitialize(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("DictionaryInitialize", functionArgs, 2);

            var dictionaryType: string = <string>this.DictionaryType(functionArgs, true)[0];
            var output: string;

            if (this.getDictionaryInitializationAsNew()) {
                output = "new " + dictionaryType + "()";
            } else {
                output = "{}";
            }

            return [output, 0];
        }

        public DictionaryInitializeEnd(functionArgs: string[], isInline: boolean): any[] {
            var output: string = this.getDictionaryInitializeEnder();

            if (!isInline) {
                output += this.getSemiColon();
            }

            return [output, -1];
        }
        
        // string key, string value[, string comma]
        public DictionaryInitializeKey(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("DictionaryInitializeKey", functionArgs, 2);

            var output: string = this.getDictionaryKeyLeft();
            output += functionArgs[0];
            output += this.getDictionaryKeyMiddle();
            output += functionArgs[1];
            output += this.getDictionaryKeyRight();

            if (functionArgs.length > 2 || this.getDictionaryInitializeKeyWithSemicolon()) {
                output += this.getDictionaryInitializeKeyComma();
            }

            return [output, 0];
        }
        
        // string keyType, string valueType
        public DictionaryInitializeStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("DictionaryInitializeStart", functionArgs, 2);

            var dictionaryType: string;
            var output: string;

            if (this.getDictionaryInitializationAsNew()) {
                dictionaryType = <string>this.DictionaryType(functionArgs, true)[0];
            } else {
                dictionaryType = "";
            }

            if (this.getDictionaryInitializationAsNew()) {
                output = "new ";
            } else {
                output = "";
            }

            output += dictionaryType;
            output += this.getDictionaryInitializeStarter();

            return [output, 0];
        }
        
        // string keyType[, ...], string valueType
        public DictionaryType(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("DictionaryType", functionArgs, 2);

            if (!this.getVariableTypesExplicit()) {
                return ["", 0];
            }

            if (!this.getDictionaryInitializationAsNew()) {
                return [this.getDictionaryClass(), 0];
            }

            var output: string = this.getDictionaryClass();
            var numKeys: number = functionArgs.length - 1;
            var i: number;

            output += "<" + this.parseType(functionArgs[0]);
            output += this.getClassTemplatesBetween();

            for (i = 1; i < numKeys; i += 1) {
                output += this.getDictionaryClass() + "<";
                output += this.parseType(functionArgs[i]);
                output += this.getClassTemplatesBetween();
            }

            output += this.parseType(functionArgs[i]);

            for (i = 0; i < numKeys; i += 1) {
                output += ">";
            }

            return [output, 0];
        }
        
        // string value
        public ElifStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ElifStart", functionArgs, 1);

            var output: string = this.getElif() + this.getConditionStartLeft();

            output += functionArgs[0] + this.getConditionStartRight();

            return ["\0", -1, output, 1];
        }

        public ElseStart(functionArgs: string[], isInline: boolean): any[] {
            return ["\0", -1, this.getElse() + this.getConditionContinueRight(), 1];
        }

        public FileEnd(functionArgs: string[], isInline: boolean): any[] {
            var output: string = this.getFileEndLine();

            if (output.length == 0) {
                return [output, Language.INT_MIN];
            }

            return [output, -1];
        }
        
        // name
        public FileStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("FileStart", functionArgs, 1);

            var left: string = this.getFileStartLeft();
            var right: string = this.getFileStartRight();

            if (left.length == 0 && right.length == 0) {
                return ["", Language.INT_MIN];
            }

            return [left + functionArgs[0] + right, 1];
        }

        public Finally(functionArgs: string[], isInline: boolean): any[] {
            var output: string = this.getExceptionFinally();

            output += this.getConditionContinueRight();

            return ["\0", -1, output, 1];
        }
        
        // string keyName, string keyType, string container
        // E.x. for each keys start : i string names
        public ForEachKeysStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ForEachKeysStart", functionArgs, 3);

            var variableDeclareArgs: string[] = [functionArgs[0], functionArgs[1]];
            var output: string;

            if (this.getForEachAsMethod()) {
                output = functionArgs[2];
                output += this.getForEachStarter();
                output += this.VariableDeclarePartial(variableDeclareArgs, true)[0];
                output += this.getForEachInner();
            } else {
                output = this.getForEachStarter();
                output += this.VariableDeclarePartial(variableDeclareArgs, true)[0];
                output += this.getForEachInner();

                if (this.getForEachKeysAsStatic()) {
                    output += this.getForEachKeysGet() + "(" + functionArgs[2] + ")";
                } else {
                    output += functionArgs[2] + this.getForEachKeysGet();
                }

                output += this.getConditionStartRight();
            }

            return [output, 1];
        }
        
        // Assume keyName and valueName exist, while pairName is created some languages won't use pairName
        // Ex. for each pairs start : pair name string count int names
        // string pairName, string keyName, string keyType, string valueName, string valueType, string container
        public ForEachPairsStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ForEachPairsStart", functionArgs, 6);

            var pairName: string = functionArgs[0];
            var keyName: string = functionArgs[1];
            var keyType: string = functionArgs[2];
            var valueName: string = functionArgs[3];
            var valueType: string = functionArgs[4];
            var container: string = functionArgs[5];
            var variableDeclareArgs: string[];
            var line: string;
            var output: any[];

            if (this.getForEachAsMethod()) {
                // container.each do |keyName, valueName|
                output = new Array(4);
                variableDeclareArgs = new Array(2);
                
                // container.each do |
                line = container;
                line += this.getForEachStarter();
                
                //                     keyName
                variableDeclareArgs[0] = keyName;
                variableDeclareArgs[1] = keyType;
                line += this.VariableDeclarePartial(variableDeclareArgs, true)[0];
                
                //                            , valueName|
                variableDeclareArgs[0] = valueName;
                variableDeclareArgs[1] = valueType;
                line += ", " + this.VariableDeclarePartial(variableDeclareArgs, true)[0];
                line += this.getForEachInner();

                output = [line, 1];
            } else if (this.getForEachPairsAsPair()) {
                // foreach KeyValuePair<string, int> pairName in container 
                //     keyName = pairName.Key;
                //     valueName = pairName.Value;
                output = new Array(6);
                
                // forEach KeyValuePair<string, int> pairName
                line = this.getForEachStarter();
                variableDeclareArgs = new Array(2);
                variableDeclareArgs[0] = pairName;
                variableDeclareArgs[1] = this.getForEachPairsPairClass() + "<" + keyType + ", " + valueType + ">";
                line += this.VariableDeclarePartial(variableDeclareArgs, true)[0];
                
                // (                                            in container) {
                line += this.getForEachInner();
                line += container;
                line += this.getConditionStartRight();

                output[0] = line;
                output[1] = 1;
                
                //     keyName = pairName.Key
                variableDeclareArgs = new Array(3);
                variableDeclareArgs[0] = keyName;
                variableDeclareArgs[1] = "equals";
                variableDeclareArgs[2] = pairName + this.getForEachPairsRetrieveKey();
                line = <string>this.Operation(variableDeclareArgs, false)[0];
                output[2] = line;
                output[3] = 0;
                
                //     valueName = pairName.Value
                variableDeclareArgs = new Array(3);
                variableDeclareArgs[0] = valueName;
                variableDeclareArgs[1] = "equals";
                variableDeclareArgs[2] = pairName + this.getForEachPairsRetrieveValue();
                line = <string>this.Operation(variableDeclareArgs, false)[0];
                output[4] = line;
                output[5] = 0;
            } else {
                // for keyName in container 
                //     valueName = container[keyName]
                output = new Array(4);
                
                // for keyName in container 
                line = this.getForEachStarter();
                line += keyName;
                line += this.getForEachInner();
                line += container;
                line += this.getConditionStartRight();
                output[0] = line;
                output[1] = 1;
                
                //     valueName = container[keyName]
                variableDeclareArgs = new Array(3);
                variableDeclareArgs[0] = valueName;
                variableDeclareArgs[1] = "equals";
                variableDeclareArgs[2] = container + "[" + keyName + "]";
                line = <string>this.Operation(variableDeclareArgs, false)[0];
                output[2] = line;
                output[3] = 0;
            }

            return output;
        }

        public ForEnd(functionArgs: string[], isInline: boolean): any[] {
            return [this.getConditionEnd(), -1];
        }
        
        // string i, string initial, string comparison, string boundary[, string change]
        // e.x. i int 0 lessthan 7
        public ForNumbersStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("ForNumbersStart", functionArgs, 4);

            var output: string = "for" + this.getConditionStartLeft();
            var i: string = functionArgs[0];
            var initial: string = functionArgs[1];
            var comparison: string = functionArgs[2];
            var boundary: string = functionArgs[3];
            var direction: string = "increaseby";
            var generalArgs: string[];
            var change: string;

            if (functionArgs.length > 4) {
                change = functionArgs[4];
            } else {
                change = "1";
            }

            if (this.getRangedForLoops()) {
                output += i;
                output += this.getRangedForLoopsStart();
                output += initial + this.getRangedForLoopsMiddle() + change;

                if (change != "1") {
                    output += this.getRangedForLoopsMiddle() + change;
                }

                output += this.getRangedForLoopsEnd();
            } else {
                generalArgs = [i, "equals", initial];
                output += this.Operation(generalArgs, true)[0] + this.getSemiColon() + " ";

                generalArgs = [i, comparison, boundary];
                output += this.Comparison(generalArgs, true)[0] + this.getSemiColon() + " ";

                generalArgs = [i, direction, change];
                output += this.Operation(generalArgs, true)[0];
            }

            output += this.getConditionStartRight();

            return [output, 1];
        }
        
        // string name[, string parameter, ...]
        public FunctionCall(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("FunctionCall", functionArgs, 1);

            var output: string = functionArgs[0] + "(";
            var i: number;

            if (functionArgs.length > 1) {
                for (i = 1; i < functionArgs.length - 1; i += 1) {
                    output += functionArgs[i] + ", ";
                }

                output += functionArgs[i];
            }

            output += ")";

            if (!isInline) {
                output += this.getSemiColon();
            }

            return [output, 0];
        }

        public FunctionCallPartialEnd(functionArgs: string[], isInline: boolean): any[] {
            var output: string = ")";

            if (!isInline) {
                output += this.getSemiColon();
            }

            return [output, -1];
        }
        
        // string name
        public FunctionCallPartialStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("FunctionCallPartialStart", functionArgs, 1);

            return [functionArgs[0] + "(", 1];
        }

        public FunctionEnd(functionArgs: string[], isInline: boolean): any[] {
            return [this.getFunctionDefineEnd(), -1];
        }
        
        // string name, string return[, string argumentName, string argumentType, ...]
        public FunctionStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("FunctionStart", functionArgs, 2);

            var output: string = "";
            var variableDeclarationArgs: string[] = [];
            var i: number;

            if (this.getFunctionReturnsExplicit() && !this.getFunctionTypeAfterName()) {
                output += this.parseType(functionArgs[1]) + " ";
            }

            output += this.getFunctionDefine() + functionArgs[0] + "(";
            
            // All arguments are added using VariableDeclarePartial
            if (functionArgs.length > 2) {
                for (i = 2; i < functionArgs.length; i += 2) {
                    variableDeclarationArgs[0] = functionArgs[i];
                    variableDeclarationArgs[1] = functionArgs[i + 1];

                    output += this.VariableDeclarePartial(variableDeclarationArgs, true)[0] + ", ";
                }
                
                // The last argument does not have the last ", " at the end
                output = output.substring(0, output.length - 2);
            }

            output += ")";

            if (this.getFunctionReturnsExplicit() && this.getFunctionTypeAfterName()) {
                output += this.getFunctionTypeMarker() + this.parseType(functionArgs[1]);
            }

            output += this.getFunctionDefineRight();
            return [output, 1];
        }

        public IfEnd(functionArgs: string[], isInline: boolean): any[] {
            return [this.getConditionEnd(), -1];
        }
        
        // string value
        public IfStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("IfStart", functionArgs, 1);

            var output: string = this.getIf() + this.getConditionStartLeft();

            output += functionArgs[0] + this.getConditionStartRight();

            return [output, 1];
        }
        
        // string file
        public Include(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("Include", functionArgs, 1);

            var output: string = this.getIncludeStarter();
            output += functionArgs[0];

            if (this.getIncludeFileExtension()) {
                output += "." + this.getExtension();
            }

            output += this.getIncludeEnder();

            return [output, 0];
        }

        public IncludeDictionary(functionArgs: string[], isInline: boolean): any[] {
            var dictionaryType: string = this.getIncludeDictionaryType();

            if (dictionaryType.length == 0) {
                return ["", Language.INT_MIN];
            }

            return this.Include([dictionaryType], isInline);
        }
        
        // [, string param, ...], statement
        public LambdaDeclareInline(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("LambdaDeclareInline", functionArgs, 3);

            var output: string = this.getLambdaDeclareStarter();
            var i: number;

            for (i = 0; i < functionArgs.length - 1; i += 1) {
                output += functionArgs[i] + ", ";
            }

            output = output.substring(0, output.length - 2);
            output += this.getLambdaDeclareMiddle();

            output += functionArgs[functionArgs.length - 1] + this.getLambdaDeclareEnder();

            return [output, 0];
        }
        
        // string visibility, string name, string return type[, string paramName, string paramType, ...]
        public LambdaTypeDeclare(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("LambdaTypeDeclare", functionArgs, 3);

            if (!this.getLambdaTypeDeclarationRequired()) {
                return ["", Language.INT_MIN];
            }

            var start: string[] = this.getLambdaTypeDeclarationStart();
            var middle: string[] = this.getLambdaTypeDeclarationMiddle();
            var end: string[] = this.getLambdaTypeDeclarationEnd();
            var variableDeclarationArgs: string[] = new Array(2);
            var line: string = "";
            var i: number;

            if (this.getLambdaTypeDeclarationAsInterface()) {
                var output: any[] = new Array(6);
                
                // public interface TestInterface 
                line = this.getClassPublicAlias();
                line += start[0];
                line += functionArgs[0];
                line += start[1];

                output[0] = line;
                output[1] = 1;
                
                // a: string, b: int : boolean;
                line = middle[0] + "(";

                if (functionArgs.length > 2) {
                    // All arguments are added using VariableDeclarePartial
                    for (i = 2; i < functionArgs.length; i += 2) {
                        variableDeclarationArgs[0] = functionArgs[i];
                        variableDeclarationArgs[1] = functionArgs[i + 1];

                        line += this.VariableDeclarePartial(variableDeclarationArgs, true)[0] + ", ";
                    }
                    
                    // The last argument does not have the last ", " at the end
                    line = line.substring(0, line.length - 2);
                }

                line += ")";

                if (this.getFunctionReturnsExplicit() && this.getFunctionTypeAfterName()) {
                    line += this.getFunctionTypeMarker() + this.parseType(functionArgs[1]);
                }

                line += middle[1];
                output[2] = line;
                output[3] = 0;
                
                // }
                output[4] = end[0];
                output[5] = -1;

                return output;
            } else {
                line += start[0] + this.getClassPublicAlias() + start[1];
                line += " " + this.parseType(functionArgs[1]);
                line += " " + functionArgs[0];

                if (functionArgs.length > 2) {
                    line += middle[0];
                    
                    // All arguments are added using VariableDeclarePartial
                    for (i = 2; i < functionArgs.length; i += 2) {
                        variableDeclarationArgs[0] = functionArgs[i];
                        variableDeclarationArgs[1] = functionArgs[i + 1];

                        line += this.VariableDeclarePartial(variableDeclarationArgs, true)[0] + ", ";
                    }
                    
                    // The last argument does not have the last ", " at the end
                    line = line.substring(0, line.length - 2);
                    line += middle[1];
                }

                line = end[0] + line + end[1];
                return [line, 0];
            }
        }

        public LoopBreak(functionArgs: string[], isInline: boolean): any[] {
            return [this.getBreak() + this.getSemiColon(), 0];
        }

        public LoopContinue(functionArgs: string[], isInline: boolean): any[] {
            return [this.getContinue() + this.getSemiColon(), 0];
        }

        public MainEnd(functionArgs: string[], isInline: boolean): any[] {
            var start: string = this.getMainStartLine();

            if (start.length == 0) {
                return [this.getMainEndLine(), 0];
            }

            return [this.getMainEndLine(), -1];
        }

        public MainStart(functionArgs: string[], isInline: boolean): any[] {
            var output: string = this.getMainStartLine();

            if (output.length == 0) {
                return [output, 0];
            }
            return [output, 1];
        }
        
        // string class, string function, string instance[, string parameter, ...]
        public NativeCall(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("NativeFunction", functionArgs, 3);

            var className: string = this.getTypeAlias(functionArgs[0]);
            var aliasInfo: any = this.getNativeFunctionAlias(functionArgs[0], functionArgs[1]);
            var placement: string = aliasInfo["placement"];
            var usage: string = aliasInfo["usage"];
            var caller: string = "";
            var output: string = "";
            var numArgs: number = 0;
            var start: number = 0;
            var i: number;

            if (placement == "member") {
                caller = functionArgs[2] + "." + aliasInfo["alias"];
                numArgs = functionArgs.length - 3;
                start = 2;
            } else if (placement == "array") {
                caller = functionArgs[2];
                numArgs = functionArgs.length - 3;
                start = 2;
            } else if (placement == "static") {
                caller = aliasInfo["alias"];
                numArgs = functionArgs.length - 2;
                start = 1;
            }

            if (usage == "function") {
                var functionCallArgs: string[] = new Array(numArgs);

                functionCallArgs[0] = caller;

                for (i = 1; i < functionArgs.length - start; i += 1) {
                    functionCallArgs[i] = functionArgs[i + start];
                }

                output = <string>this.FunctionCall(functionCallArgs, isInline)[0];
            } else if (usage == "variable") {
                output = caller;
            } else if (usage == "array") {
                output = caller + "[";
                
                // Default to just the separator if there are no arguments
                if (functionArgs.length - 1 == start) {
                    output += aliasInfo["separator"];
                } else {
                    for (i = 1; i < functionArgs.length - start; i += 1) {
                        output += functionArgs[i + start] + aliasInfo["separator"];
                    }
                    
                    // Remove the last separator if more than one argument is added
                    if (functionArgs.length - start > 2) {
                        output = output.substring(0, output.length - aliasInfo["separator"].length);
                    }
                }

                output += "]";
            }

            return [output, 0];
        }
        
        // string value
        public Not(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("Operation", functionArgs, 1);

            return ["!" + functionArgs[0], 0];
        }
        
        // string left, string operator, string right[, string operator, string right, ...]
        public Operation(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("Operation", functionArgs, 3);

            var output: string = functionArgs[0] + " ";
            var i: number;

            for (i = 1; i < functionArgs.length; i += 2) {
                output += this.getOperationAlias(functionArgs[i]) + " ";
                output += this.getValueAlias(functionArgs[i + 1]) + " ";
            }

            output = output.substring(0, output.length - 1);

            if (!isInline) {
                output += this.getSemiColon();
            }

            return [output, 0];
        }
        
        // string inside[, ...]
        public Parenthesis(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("Parenthesis", functionArgs, 1);

            var output: string = "(";
            var i: number;

            for (i = 0; i < functionArgs.length - 1; i += 1) {
                output += functionArgs[i] + ", ";
            }

            output += functionArgs[i];
            output += ")";

            return [output, 0];
        }
        
        // [string message, ...]
        public PrintLine(functionArgs: string[], isInline: boolean): any[] {
            var output: string = this.getPrintFunction() + "(";
            var i: number;

            for (i = 0; i < functionArgs.length - 1; i += 1) {
                output += functionArgs[i] + ", ";
            }

            output += functionArgs[i];
            output += ")";

            if (!isInline) {
                output += this.getSemiColon();
            }

            return [output, 0];
        }
        
        // string value
        public Return(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("FunctionReturn", functionArgs, 1);

            return ["return " + functionArgs[0] + this.getSemiColon(), 0];
        }

        public This(functionArgs: string[], isInline: boolean): any[] {
            return [this.getClassThis(), 0];
        }
        
        // [string message]
        public Throw(functionArgs: string[], isInline: boolean): any[] {
            var output: string = this.getExceptionThrow() + " ";

            if (functionArgs.length > 0) {
                output += this.ClassNew([this.getExceptionClass(), functionArgs[0]], true)[0];
            } else {
                output += this.ClassNew([this.getExceptionClass()], true)[0];
            }

            if (!isInline) {
                output += this.getSemiColon();
            }

            return [output, 0];
        }

        public TryStart(functionArgs: string[], isInline: boolean): any[] {
            return [this.getExceptionTry() + this.getConditionContinueRight(), 1];
        }

        public TryEnd(functionArgs: string[], isInline: boolean): any[] {
            return [this.getConditionEnd(), -1];
        }
        
        // string type
        public Type(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("Type", functionArgs, 1);
            return [this.getTypeAlias(functionArgs[0]), 0];
        }
        
        // string value
        public Value(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("VariableDeclare", functionArgs, 1);

            return [this.getValueAlias(functionArgs[0]), 0];
        }
        
        // string name, string type[, string value]
        // Ex. var x: number;
        // Ex. var x: number = 7;
        public VariableDeclare(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("VariableDeclare", functionArgs, 2);

            var output: any[] = this.VariableDeclareIncomplete(functionArgs, isInline);

            if (!isInline) {
                output[0] = output[0] + this.getSemiColon();
            }

            output[1] = 0;

            return output;
        }
        
        // string name, string type[, string value]
        // Ex. var x: number
        // Ex. var x: number = 7
        public VariableDeclareIncomplete(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("VariableDeclareIncomplete", functionArgs, 2);

            var variableType: string = this.parseType(functionArgs[1]);
            var variableDeclarationArgs: string[];
            var variableDeclared: any[];

            if (functionArgs.length == 2) {
                variableDeclarationArgs = [functionArgs[0], variableType];
            } else {
                variableDeclarationArgs = [functionArgs[0], variableType, functionArgs[2]];
            }

            variableDeclared = this.VariableDeclarePartial(functionArgs, isInline);
            variableDeclared[0] = this.getVariableDeclareStart() + variableDeclared[0];
            variableDeclared[1] = 1;

            return variableDeclared;
        }
        
        // string name, string type[, string value]
        // Ex. x: number
        // Ex. x: number = 7
        public VariableDeclarePartial(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("VariableDeclarePartial", functionArgs, 2);

            var variableType: string = this.parseType(functionArgs[1]);
            var output: string = "";

            if (this.getVariableTypesExplicit()) {
                if (this.getVariableTypesAfterName()) {
                    output += functionArgs[0] + this.getVariableTypeMarker() + this.parseType(functionArgs[1]);
                } else {
                    output += this.parseType(variableType) + " " + functionArgs[0];
                }
            } else {
                output += functionArgs[0];
            }

            if (functionArgs.length > 2) {
                output += " " + this.getOperationAlias("equals") + " " + this.getValueAlias(functionArgs[2]);
            }

            return [output, 1];
        }

        public WhileEnd(functionArgs: string[], isInline: boolean): any[] {
            return [this.getConditionEnd(), -1];
        }
        
        // string value
        public WhileStart(functionArgs: string[], isInline: boolean): any[] {
            this.requireArgumentsLength("WhileVariableStart", functionArgs, 1);

            var output: string = "while" + this.getConditionStartLeft();

            output += this.getOperationAlias(functionArgs[0]) + this.getConditionStartRight();

            return [output, 1];
        }
        
        
        /*
        Utilities
        */

        private requireArgumentsLength(functionName: string, functionArgs: string[], amount: number): void {
            if (functionArgs.length < amount) {
                throw new Error("Not enough arguments given to " + functionName + ". Required: " + amount + ".");
            }
        }

    }
}
