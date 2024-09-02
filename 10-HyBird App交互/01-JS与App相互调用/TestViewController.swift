import UIKit
import WebKit

class TestViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler {

    private var webView: WKWebView!
    private var isLoaded = false

    override func viewDidLoad() {
        super.viewDidLoad()

        self.navigationItem.title = "WKWebView 交互"
        
        webView =  WKWebView(frame: self.view.bounds)
        webView.navigationDelegate = self
        let urlStr = "http://localhost:5173/#/"
        if let url = URL(string: urlStr) {
            let request = URLRequest(url: url, cachePolicy: .reloadIgnoringCacheData, timeoutInterval: 10)
            webView.load(request)
        }
        self.view.addSubview(webView)
        
        // 定义一个iOS方法名 给 JS调用
        webView.configuration.userContentController.add(self, name: "nativeFuncHandler")
        
        let btn = UIButton(frame: CGRect(x: 100, y: 200, width: 200, height: 44))
        btn.backgroundColor = UIColor.blue.withAlphaComponent(0.3)
        btn.setTitle("ios调用JS方法", for: .normal)
        btn.addTarget(self, action: #selector(clickOnJS), for: .touchUpInside)
        self.view.addSubview(btn)
        
        
    }
    
    @objc private func clickOnJS() {
        if isLoaded {
            self.webView.evaluateJavaScript("doSomething('我是iOS的参数')") { resValue, error in
                if let error = error {
                    print("执行JS方法失败：", error.localizedDescription)
                } else if let resValue = resValue {
                    print("执行JS方法成功，返回值为：", resValue)
                }
            }
        }
        print("--- iOS 调用 JS 方法")
    }
    
    // MARK: - WKNavigationDelegate
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        self.isLoaded = true
    }
    
    // MARK: - WKScriptMessageHandler
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        
        print("JS 调用 iOS 的方法明 = \(message.name)", "JS 传递的参数 = \(message.body)")
    }

}


