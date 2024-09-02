
import UIKit
import WebKit

class TestViewController: UIViewController, WKNavigationDelegate {

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

    }
    

    // MARK: - WKNavigationDelegate
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        self.isLoaded = true
    }
    
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        // 获取URL
        let url = navigationAction.request.url?.absoluteString
        if url == "heima://click" {
            print("--- 调用系统的功能")
            decisionHandler(.cancel)
        } else {
            decisionHandler(.allow)
        }
        
    }
    

}


