<?php

trait MoreOptions
{

    protected function validationLength($ruleType, $msg): void
    {
        foreach ($this->requests as $request => $value) {
            $type = $value['type'];
            $length = $this->RuleFilterValue($value['rules'], $ruleType);

            if ($length) {
                switch ($type):
                    case "number":
                    case 'int':
                    case "float":


                        if ($ruleType == 'min:') {
                            if (intval($value['value']) < intval($length)) {
                                $this->setError($request, $msg($request, $length));
                            }
                        } else {
                            if (intval($value['value']) > intval($length)) {
                                $this->setError($request, $msg($request, $length));
                            }
                        }
                        break;
                    case "string":

                        if ($ruleType == 'min:') {
                            if (mb_strlen($value['value'] ,'UTF-8') < intval($length)) {
                                $this->setError($request, $msg($request, $length));
                            }
                        } else {
                            if (mb_strlen($value['value'] ,'UTF-8') > intval($length)) {
                                $this->setError($request, $msg($request, $length));
                            }
                        }
                        break;
                    case "email":

                        if ($ruleType == 'min:') {
                            $email = substr($value['value'], 0, strpos($value['value'], "@"));
                            if (mb_strlen($email ,'UTF-8') < intval($length)) {
                                $this->setError($request, $msg($request, $length));
                            }
                        } else {
                            $email = substr($value['value'], 0, strpos($value['value'], "@"));

                            if (mb_strlen($email ,'UTF-8') > intval($length)) {
                                $this->setError($request, $msg($request, $length));
                            }
                        }
                        break;
                endswitch;
            }

        }
    }

    protected function min(): void
    {
        $this->validationLength("min:", function ($req, $length) {
            return "$req field must be greater than {$length}";
        });
    }

    protected function max(): void
    {
        $this->validationLength("max:", function ($req, $length) {
            return "$req field must be less than {$length}";
        });
    }

    protected function isAllowExtensionEmail(): void
    {
        foreach ($this->requests as $request => $value) {
            $type = $value['type'];
            if ($type == 'email') {
                $email = explode("@", $value['value']);
                $email = end($email);
                $emailExtension = $this->RuleFilterValue($value['rules'], "ex:");
                if ($emailExtension) {
                    $emailExtension = explode(',', $emailExtension);
                    if (!in_array($email, $emailExtension)) {
                        $this->setError($request, "email is not allow");
                    }
                }

            }
        }
    }

}