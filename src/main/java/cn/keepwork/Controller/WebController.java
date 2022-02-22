package cn.keepwork.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping("/index.html")
public String index(){
        return "index";
    }
    @GetMapping("/aboutzhiim")
    public String aboutzhiim(){
        return "aboutzhiim";
    }
    @GetMapping("/privicyzhiim")
public String privicyzhiim(){
        return "privicyzhiim";
    }
    @GetMapping("/functionzhiim")
    public String functionzhiim(){
        return "functionzhiim";
    }
    @GetMapping("/aboutzhiimmob")
    public String aboutzhiimmob(){
        return "index";
    }
    @GetMapping("/about.html")
    public String about(){
        return "about";
    }
    @GetMapping("/services.html")
    public String services(){
        return "services";
    }
    @GetMapping("/team.html")
    public String team(){
        return "team";
    }
    @GetMapping("/blog.html")
    public String blog(){
        return "blog";
    }

}
