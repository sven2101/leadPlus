interface IDirective {

    restrict: string;
    scope: {};
    templateUrl: (elem, attr) => string;
    transclude: boolean;
    link: (scope, element, attrs, ctrl, transclude) => void;
}

